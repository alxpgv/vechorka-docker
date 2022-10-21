import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { PostQueryParamsDTO, PostSearchQueryParamsDTO } from './post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('index')
  getIndexPosts() {
    return this.postService.getIndexPosts();
  }

  @Get()
  getPosts(@Query() query: PostQueryParamsDTO) {
    return this.postService.getPosts({
      ...query,
      relations: { taxonomy: query.taxonomy, user: query.user },
    });
  }

  @Get('slug/:slug')
  getPost(@Query() query, @Param('slug') slug: string) {
    const slugTaxonomy = query?.slugTaxonomy;
    const withRelatedPosts = Boolean(query?.withRelatedPosts);
    const postType = query?.postType;

    return this.postService.getPost({
      slug,
      slugTaxonomy,
      postTypeRelated: postType,
      withRelatedPosts,
    });
  }

  @Get('taxonomy/slug/:slug')
  getPostsByTaxonomySlug(
    @Query() query: PostQueryParamsDTO,
    @Param('slug') slug,
  ) {
    return this.postService.getPostsByTaxonomySlug({
      slug,
      ...query,
      relations: { taxonomy: query.taxonomy, user: query.user },
    });
  }

  @Get('search')
  getPostsSearch(@Query() query: PostSearchQueryParamsDTO) {
    return this.postService.getPostsSearch(query);
  }
}
