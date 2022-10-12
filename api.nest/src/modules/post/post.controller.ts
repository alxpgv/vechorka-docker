import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostQueryParamsDTO } from './post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('index')
  getIndexPosts() {
    return this.postService.getIndexPosts();
  }

  @Get('slug/:slug')
  getPost(@Query() query, @Param('slug') slug: string) {
    const slugTaxonomy = query?.slugTaxonomy;
    return this.postService.getPost(slug, slugTaxonomy);
  }

  @Get()
  getPosts(@Query() query: PostQueryParamsDTO) {
    return this.postService.getPosts({
      ...query,
      relations: { taxonomy: query.taxonomy, user: query.user },
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
}
