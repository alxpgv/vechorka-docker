import { Injectable } from '@nestjs/common';
import { PostService } from '../post/post.service';
import { TaxonomyService } from '../taxonomy/taxonomy.service';

@Injectable()
export class SettingsService {
  constructor(
    private postService: PostService,
    private taxonomyService: TaxonomyService,
  ) {}

  async getCommon() {
    const taxonomies = await this.taxonomyService.getTaxonomiesGroup();
    let advert = null;

    // advert post
    try {
      advert = await this.postService.getPostById({
        postId: 708,
        withMeta: true,
      });
    } catch (error) {
      console.log('settings, get advert: ', error);
    }

    return { taxonomies, advert: advert?.meta || null };
  }
}
