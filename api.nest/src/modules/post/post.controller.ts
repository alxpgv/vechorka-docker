import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  AddPollReply,
  PostQueryParamsDTO,
  PostSearchQueryParamsDTO,
} from './post.dto';
import { IpAddress } from '../../utils/decorators/ip-address';

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

  @Get('id/:id')
  getPostById(@Query() query, @Param('id', ParseIntPipe) postId: number) {
    const withMeta = Boolean(query?.withMeta);

    return this.postService.getPostById({ postId, withMeta });
  }

  @Get('slug/:slug')
  getPostBySlug(@Query() query, @Param('slug') slug: string) {
    const slugTaxonomy = query?.slugTaxonomy;
    const withRelatedPosts = Boolean(query?.withRelatedPosts);
    const postType = query?.postType;

    return this.postService.getPostBySlug({
      slug,
      slugTaxonomy,
      postTypeRelated: postType,
      withRelatedPosts,
    });
  }

  @Get('taxonomy/slug/:slug')
  getPostsByTaxonomySlug(
    @Query() query: PostQueryParamsDTO,
    @Param('slug') slug: string,
  ) {
    return this.postService.getPostsByTaxonomySlug({
      slug,
      ...query,
      relations: { taxonomy: query.taxonomy, user: query.user },
    });
  }

  @Get('top')
  getPostsTop() {
    return this.postService.getPostsTop();
  }

  @Get('commented')
  getPostsCommented() {
    return this.postService.getPostsCommented();
  }

  @Get('interest')
  getPostsInterest() {
    return this.postService.getPostsInterest();
  }

  @Get('search')
  getPostsSearch(@Query() query: PostSearchQueryParamsDTO) {
    return this.postService.getPostsSearch(query);
  }

  @Post('poll')
  addPollReply(@Body() body: AddPollReply) {
    return this.postService.addPollReply(body);
  }
}
