import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostMeta } from './post-meta.entity';
import type { ImageWithSizes } from '../../types';
import { TaxonomyService } from '../taxonomy/taxonomy.service';
import type { PostResponse, PostType } from './post.interface';
import type { TaxonomyResponse } from '../taxonomy/taxonomy.interface';
import { BasePostParams } from './post.interface';
import { AttachmentService } from '../attachment/attachment.service';
import { PostSearchQueryParamsDTO } from './post.dto';

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

    const interestNews = await this.getPostsInterest();

    return {
      mainNews,
      lastNews,
      interestNews,
      articles,
    };
  }

  getPostById(postId: number): Promise<Post> {
    return this.postRepository.findOneBy({ ID: postId });
  }

  async getPost({
    slug,
    slugTaxonomy,
    withRelatedPosts = false,
    postTypeRelated = 'post',
  }: {
    slug: string;
    slugTaxonomy?: string;
    withRelatedPosts?: boolean;
    postTypeRelated?: PostType;
  }) {
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

      const response = {
        post: this.responseData([post], metas, undefined, 'full')[0],
        relatedPosts: null,
      };

      //add post count views to meta
      await this.addPostViews(post.post_ID);

      // related posts, exclude current post
      if (withRelatedPosts) {
        response.relatedPosts = await this.getPosts({
          excludeIds: [post.post_ID],
          limit: 4,
          postType: postTypeRelated,
          relations: { taxonomy: true },
        });
      }

      return response;
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
    includeIds,
    isResponseIds,
    relations = { taxonomy: undefined, user: undefined },
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

    if (postType === 'attachment') {
      query = query.where('post_type=:postType', {
        postType,
      });
    } else {
      query = query.where('post_status = "publish" AND post_type=:postType', {
        postType,
      });
    }

    if (excludeIds?.length > 0) {
      query = query.andWhere('ID NOT IN (:excludeIds)', {
        excludeIds,
      });
    }

    if (includeIds?.length > 0) {
      query = query.andWhere('ID IN (:includeIds)', {
        includeIds,
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

    // metas, taxonomies
    if (posts?.length) {
      const postsIds = posts.map((post) => Number(post.post_ID));
      const metas = await this.getPostMetaByIds(postsIds);
      // return metas;

      let taxonomies = [];
      if (relations.taxonomy) {
        taxonomies = await this.getTaxonomiesByPostsIds(postsIds, true);
      }
      // return taxonomies;

      const response = this.responseData(posts, metas, taxonomies);

      return isResponseIds ? { data: response, postsIds } : response;
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

  // get post meta fields, and children _thumbnail_id - preview image
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

  // search
  async getPostsSearch({
    q,
    offset = 0,
    limit = 20,
  }: PostSearchQueryParamsDTO) {
    const search = q
      .replace(/([^\w\u0430-\u044f\d\s\-,]+)/gi, '')
      .trim()
      .slice(0, 60);

    const query = this.postRepository
      .createQueryBuilder('post')
      .where('post_status="publish"')
      .andWhere('(post_type="post" OR post_type="article")')
      .andWhere(
        '(post_title LIKE :q OR post_excerpt LIKE :q OR post_content LIKE :q)',
        {
          q: `%${search}%`,
        },
      )
      .orderBy('post_date', 'DESC');

    const posts = await query.offset(offset).limit(limit).getRawMany();

    // metas, taxonomies
    if (posts?.length) {
      const postsIds = posts.map((post) => Number(post.post_ID));
      const metas = await this.getPostMetaByIds(postsIds);
      const taxonomies = await this.getTaxonomiesByPostsIds(postsIds, true);
      return this.responseData(posts, metas, taxonomies);
    }

    throw new NotFoundException('posts not found');
  }

  private async getTaxonomiesByPostsIds(postIds: number[], terms = false) {
    if (Array.isArray(postIds) && postIds.length) {
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

            // image preview
            if (
              meta.children_meta_key === '_wp_attachment_metadata' &&
              meta.children_meta_value
            ) {
              newPost.preview = this.attachmentService.unserializeImageMeta(
                meta.children_meta_value,
                'wp-content/uploads',
              );
            }

            // image in post_type = attachment
            if (
              meta.meta_meta_key === '_wp_attachment_metadata' &&
              meta.meta_meta_value
            ) {
              newPost.preview = this.attachmentService.unserializeImageMeta(
                meta.meta_meta_value,
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

            // if first letter not _ then this additional meta field
            if (meta.meta_meta_key[0] !== '_') {
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

  private async addPostViews(postId: number) {
    const metaViews = await this.metaRepository
      .createQueryBuilder('meta')
      .select()
      .where('meta.post_id=:postId AND meta.meta_key="views"', { postId })
      .getOne();

    if (metaViews) {
      await this.metaRepository.update(
        { post_id: postId, meta_key: 'views' },
        {
          meta_value: String(Number(metaViews.meta_value) + 1),
        },
      );
    } else {
      await this.metaRepository.insert({
        meta_key: 'views',
        post_id: postId,
        meta_value: String(1),
      });
    }
    return metaViews;
  }

  // top posts
  async getPostsTop() {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.meta', 'meta', 'meta.meta_key="views"')
      .where('post_status = "publish" AND post_type="post"')
      .andWhere('YEARWEEK(post_date) = YEARWEEK(CURDATE())')
      .orderBy('cast(meta.meta_value as unsigned)', 'DESC')
      .limit(5)
      .getRawMany();

    // metas, taxonomies
    if (posts?.length) {
      const postsIds = posts.map((post) => Number(post.post_ID));
      const metas = await this.getPostMetaByIds(postsIds);
      const taxonomies = await this.getTaxonomiesByPostsIds(postsIds, true);
      return this.responseData(posts, metas, taxonomies);
    }

    throw new NotFoundException('posts not found');
  }

  // commented posts
  async getPostsCommented() {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .where(
        'post_status = "publish" AND post_type="post" AND comment_count > 0',
      )
      .andWhere('YEARWEEK(post_date) = YEARWEEK(CURDATE())')
      .orderBy('comment_count', 'DESC')
      .limit(5)
      .getRawMany();

    // metas, taxonomies
    if (posts?.length) {
      const postsIds = posts.map((post) => Number(post.post_ID));
      const metas = await this.getPostMetaByIds(postsIds);
      const taxonomies = await this.getTaxonomiesByPostsIds(postsIds, true);
      return this.responseData(posts, metas, taxonomies);
    }

    throw new NotFoundException('posts not found');
  }

  // interest posts
  async getPostsInterest() {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.meta', 'meta', 'meta.meta_key="interest"')
      .where('post_status = "publish" AND post_type="post"')
      .orderBy('meta.meta_value+0.0', 'DESC')
      .addOrderBy('post_date', 'DESC')
      .limit(4)
      .getRawMany();

    // return posts;

    // metas, taxonomies
    if (posts?.length) {
      const postsIds = posts.map((post) => Number(post.post_ID));
      const metas = await this.getPostMetaByIds(postsIds);
      const taxonomies = await this.getTaxonomiesByPostsIds(postsIds, true);
      return this.responseData(posts, metas, taxonomies);
    }

    throw new NotFoundException('posts not found');
  }
}
