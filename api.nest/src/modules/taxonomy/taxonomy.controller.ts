import { Controller, Get, Param } from '@nestjs/common';
import { TaxonomyService } from './taxonomy.service';

@Controller('taxonomies')
export class TaxonomyController {
  constructor(private readonly termService: TaxonomyService) {}

  @Get('/group')
  getTaxonomiesGroup() {
    return this.termService.getTaxonomiesGroupTaxonomy();
  }

  @Get()
  getAllTaxonomies() {
    return this.termService.getTaxonomies();
  }

  @Get(':taxonomy')
  getTaxonomy(@Param('taxonomy') taxonomy: string) {
    return this.termService.getTaxonomy(taxonomy);
  }
}
