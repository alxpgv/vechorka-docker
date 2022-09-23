import { Controller, Get, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // @Get()
  // get() {
  //   return this.termService.getTerms();
  // }

  // @Get('taxonomy/:slug/posts')
  // getTaxonomies(@Param('slug') slug: string) {
  //   return this.termService.getPostsByTaxonomySlug(slug);
  // }
}
