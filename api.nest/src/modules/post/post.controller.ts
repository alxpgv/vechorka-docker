import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Get('index')
  getIndexPosts() {
    return this.postService.getIndexPosts();
  }

  // TODO: pipe validation query, min/max
  @Get('slug/:slug')
  getPost(@Query() query, @Param('slug') slug: string) {
    const slugTaxonomy = query?.slugTaxonomy;
    return this.postService.getPost(slug, slugTaxonomy);
  }

  // TODO: pipe validation query, min/max
  @Get()
  getPosts(@Query() query) {
    let limit = parseInt(query?.limit);
    limit = isNaN(limit) ? undefined : limit;

    let offset = parseInt(query?.offset);
    offset = isNaN(offset) ? undefined : offset;

    const sticky = Boolean(parseInt(query?.sticky));
    const taxonomy = Boolean(parseInt(query?.taxonomy));

    return this.postService.getPosts({
      sticky,
      limit,
      offset,
      postType: query?.postType,
      relations: { taxonomy },
    });
  }

  // TODO: pipe validation query, min/max
  @Get('taxonomy/id/:id?')
  getPostsByTaxonomyId(@Query() query, @Param('id') id) {
    let limit = parseInt(query?.limit);
    limit = isNaN(limit) ? undefined : limit;

    let offset = parseInt(query?.offset);
    offset = isNaN(offset) ? undefined : offset;

    const sticky = Boolean(parseInt(query?.sticky));
    const taxonomy = Boolean(parseInt(query?.taxonomy));

    let taxonomyId = parseInt(id);
    taxonomyId = isNaN(taxonomyId) ? undefined : taxonomyId;

    return this.postService.getPosts({
      taxonomyId,
      sticky,
      limit,
      offset,
      postType: query?.postType,
      relations: { taxonomy },
    });
  }

  // TODO: pipe validation query, min/max
  @Get('taxonomy/slug/:slug')
  getPostsByTaxonomySlug(@Query() query, @Param('slug') slug) {
    let limit = parseInt(query?.limit);
    limit = isNaN(limit) ? undefined : limit;

    let offset = parseInt(query?.offset);
    offset = isNaN(offset) ? undefined : offset;

    const sticky = Boolean(parseInt(query?.sticky));
    const taxonomy = Boolean(parseInt(query?.taxonomy));

    return this.postService.getPostsByTaxonomySlug({
      slug,
      sticky,
      limit,
      offset,
      postType: query?.postType,
      relations: { taxonomy },
    });
  }
}
