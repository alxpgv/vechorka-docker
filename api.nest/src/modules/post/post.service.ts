import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostMeta } from './post-meta.entity';
import type { ImageWithSizes } from '../../types';
import { TaxonomyService } from '../taxonomy/taxonomy.service';
import type { PostResponse } from './post.interface';
import type { TaxonomyResponse } from '../taxonomy/taxonomy.interface';
import { BasePostParams } from './post.interface';
import { AttachmentService } from '../attachment/attachment.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostMeta)
    private readonly metaRepository: Repository<PostMeta>,
    private readonly taxonomyService: TaxonomyService,
    private readonly attachmentService: AttachmentService,
  ) {}

  // home page posts
  async getIndexPosts() {
    const mainPosts: any = await this.getPosts({
      limit: 5,
      isResponseIds: true,
      sticky: true,
      relations: { taxonomy: true },
    });

    const mainNews = mainPosts?.data;
    const mainNewsIds = mainPosts?.postsIds || undefined;

    const lastNews = await this.getPosts({
      limit: 9,
      // sticky: true,
      excludeIds: mainNewsIds,
      relations: { taxonomy: true },
    });

    const articles = await this.getPosts({
      limit: 5,
      postType: 'article',
    });

    const interestNews = await this.getPosts({
      limit: 4,
      postType: 'post',
      relations: { taxonomy: true },
    });

    return {
      mainNews,
      lastNews,
      interestNews,
      articles,
    };
  }

  async getPost(slug: string, slugTaxonomy?: string) {
    let query = this.postRepository.createQueryBuilder('post');

    if (slugTaxonomy) {
      const taxonomies = await this.taxonomyService.getTaxonomies();
      const taxonomy = taxonomies.find(
        (tax) => tax.terms.slug === slugTaxonomy,
      );
      const taxonomyId = taxonomy?.term_taxonomy_id;

      if (taxonomyId) {
        query = query.innerJoinAndSelect(
          'post.post_taxonomy',
          'taxonomyRel',
          'taxonomyRel.term_taxonomy_id=:taxonomyId',
          { taxonomyId },
        );
      } else {
        throw new NotFoundException('post not found');
      }
    }

    query = query
      .leftJoin('post.user', 'user')
      .addSelect(['user.display_name'])
      .where('post_name=:slug AND post_status = "publish"', {
        slug,
      });

    const post: any = await query.getRawOne();

    if (post && Object.keys(post).length) {
      const metas = await this.getPostMetaByIds(post.post_ID);
      return this.responseData([post], metas, undefined, 'full')[0];
    }

    throw new NotFoundException('post not found');
  }

  async getPosts({
    taxonomyId,
    limit = 20,
    offset = 0,
    postType = 'post',
    sticky,
    excludeIds,
    isResponseIds,
    relations,
  }: BasePostParams & {
    taxonomyId?: number;
    isResponseIds?: boolean;
  }) {
    // : Promise<PostResponse[] | { data: PostResponse[]; postsIds: number[] }>
    let query = this.postRepository.createQueryBuilder('post');
    if (taxonomyId) {
      query = query.innerJoinAndSelect(
        'post.post_taxonomy',
        'taxonomyRel',
        'taxonomyRel.term_taxonomy_id=:taxonomyId',
        { taxonomyId },
      );
    }

    if (sticky) {
      query = query.leftJoinAndSelect(
        'post.meta',
        'metaSticky',
        'metaSticky.meta_key="sticky"',
      );
    }

    if (relations?.user) {
      query = query.leftJoin('post.user', 'user').addSelect([
        'user.display_name',
        // 'user.user_login',
        // 'user.user_nicename',
      ]);
    }

    query = query.where('post_status = "publish" AND post_type=:postType', {
      postType,
    });

    if (excludeIds?.length > 0) {
      query = query.andWhere('ID NOT IN (:excludeIds)', {
        excludeIds,
      });
    }

    if (sticky) {
      query = query
        .orderBy('metaSticky.meta_value', 'DESC')
        .addOrderBy('post_date', 'DESC');
    } else {
      query = query.orderBy('post_date', 'DESC');
    }

    const posts = await query.offset(offset).limit(limit).getRawMany();
    // return posts;

    if (posts?.length) {
      const postsIds = posts.map((post) => Number(post.post_ID));
      const metas = await this.getPostMetaByIds(postsIds);

      let taxonomies = [];
      if (relations.taxonomy) {
        taxonomies = await this.getPostTaxonomyByIds(postsIds, true);
      }
      // return taxonomies;

      const responsePosts = this.responseData(posts, metas, taxonomies);

      return isResponseIds ? { data: responsePosts, postsIds } : responsePosts;
    }

    return null;
  }

  async getPostsByTaxonomySlug(params: BasePostParams & { slug: string }) {
    if (!params.slug) return null;
    const taxonomies = await this.taxonomyService.getTaxonomies();
    const taxonomy = taxonomies.find((tax) => tax.terms.slug === params.slug);

    if (!taxonomy) throw new NotFoundException('post not found');

    return await this.getPosts({ taxonomyId: taxonomy.term_id, ...params });
  }

  private getPostMetaByIds(postIds: number | number[]) {
    if (postIds || (Array.isArray(postIds) && postIds.length)) {
      return (
        this.metaRepository
          .createQueryBuilder('meta')
          // thumbnail meta
          .leftJoinAndSelect(
            'meta.children',
            'children',
            'meta.meta_key="_thumbnail_id"',
          )
          .where('meta.post_id IN (:postIds)', { postIds })
          .getRawMany()
      );
    }
    return null;
  }

  // async getAttachmentsByIds(ids: number[]) {
  //   return this.postRepository
  //     .createQueryBuilder('post')
  //     .leftJoinAndSelect('post.meta', 'meta', 'meta.post_id = post.ID')
  //     .where('post.ID IN (:ids)', { ids })
  //     .andWhere('post.post_type="attachment"')
  //     .getMany();
  // }

  private async getPostTaxonomyByIds(
    postIds: number | number[],
    terms = false,
  ) {
    if (postIds || (Array.isArray(postIds) && postIds.length)) {
      let query = this.postRepository
        .createQueryBuilder('post')
        .select('post.ID')
        .innerJoinAndSelect(
          'post.post_taxonomy',
          'taxonomyRel',
          'taxonomyRel.object_id = post.ID',
        );

      if (terms) {
        query = query
          .leftJoinAndSelect('taxonomyRel.taxonomy', 'taxonomy')
          .leftJoinAndSelect('taxonomy.terms', 'terms');
      }

      query = query.where('taxonomyRel.object_id IN (:postIds)', { postIds });

      return query.getRawMany();
    }

    return null;
  }

  private responseData(
    posts: any[],
    metas?: any[],
    taxonomies?: any[],
    type: 'short' | 'full' = 'short',
  ): PostResponse[] {
    const data = posts.map((post) => {
      const taxonomyId: number[] = post.taxonomyRel_term_taxonomy_id
        ? [Number(post.taxonomyRel_term_taxonomy_id)]
        : [];
      const newPost: PostResponse = {
        id: Number(post.post_ID),
        guid: post.post_guid,
        slug: post.post_post_name,
        type: post.post_post_type,
        title: post.post_post_title,
        content: type === 'full' ? post.post_post_content : '',
        excerpt: post.post_post_excerpt,
        commentStatus: post.post_comment_status,
        commentCount: Number(post.post_comment_count),
        status: post.post_post_status,
        createdAt: post.post_post_date,
        updatedAt: post.post_post_modified,
        taxonomyId,
        taxonomies: null,
        user: post.user_display_name ?? null,
        sticky: false,
        preview: <ImageWithSizes>{},
        meta: {},
        seo: {
          focusKeyword: null,
          description: null,
        },
      };

      // meta fields
      if (metas?.length) {
        for (let i = metas.length - 1; i >= 0; --i) {
          const meta = metas[i];
          if (meta.meta_post_id === post.post_ID && meta.meta_meta_value) {
            // sticky
            if (meta.meta_meta_key === 'sticky') {
              newPost.sticky = !!Number(meta.meta_meta_value);
            }

            // image
            if (
              meta.children_meta_key === '_wp_attachment_metadata' &&
              meta.children_meta_value
            ) {
              newPost.preview = this.attachmentService.unserializeImageMeta(
                meta.children_meta_value,
                'wp-content/uploads',
              );
            }

            // yoast seo
            if (meta.meta_meta_key === '_yoast_wpseo_focuskw') {
              newPost.seo.focusKeyword = meta.meta_meta_value;
            }

            if (meta.meta_meta_key === '_yoast_wpseo_metadesc') {
              newPost.seo.description = meta.meta_meta_value;
            }

            // if first letter not _ = additional meta field
            if (meta.meta_meta_key[0] !== '_') {
              // let metaValue = meta.meta_meta_value;
              //
              // // gallery
              // if (meta.meta_meta_key === 'gallery') {
              //   metaValue = unserializeValue(metaValue);
              // }

              newPost.meta = {
                ...newPost.meta,
                [meta.meta_meta_key]: meta.meta_meta_value,
              };
            }
          }

          // remove current item
          if (meta.meta_post_id === post.post_ID) {
            metas.splice(i, 1);
          }
        }
      }

      // taxonomies fields
      if (taxonomies?.length) {
        const categories: TaxonomyResponse[] = [];
        const geography: TaxonomyResponse[] = [];
        const tags: TaxonomyResponse[] = [];
        for (let i = taxonomies.length - 1; i >= 0; --i) {
          const taxonomy = taxonomies[i];
          if (taxonomy.post_ID === post.post_ID) {
            if (taxonomy.taxonomy_taxonomy) {
              const newTaxonomy: TaxonomyResponse = {
                id: Number(taxonomy.terms_term_id) ?? null,
                taxonomyId: Number(taxonomy.taxonomy_term_taxonomy_id),
                description: taxonomy.taxonomy_description ?? null,
                parent: Number(taxonomy.taxonomy_parent) ?? null,
                name: taxonomy.terms_name ?? null,
                slug: taxonomy.terms_slug ?? null,
              };

              if (taxonomy.taxonomy_taxonomy === 'category') {
                categories.push(newTaxonomy);
              }

              if (taxonomy.taxonomy === 'post_geography') {
                geography.push(newTaxonomy);
              }

              if (taxonomy.taxonomy_taxonomy === 'post_tag') {
                tags.push(newTaxonomy);
              }
            }

            if (taxonomy.taxonomyRel_term_taxonomy_id) {
              taxonomyId.push(Number(taxonomy.taxonomyRel_term_taxonomy_id));
            }

            // remove current item
            taxonomies.splice(i, 1);
          }
        }

        newPost.taxonomies = {
          categories,
          geography,
          tags,
        };
      }

      return newPost;
    });

    return data;
  }
}
