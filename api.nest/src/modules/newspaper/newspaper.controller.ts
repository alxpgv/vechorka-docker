import { Controller, Get, Param, Query } from '@nestjs/common';
import { NewspaperService } from './newspaper.service';
import { NewspaperParamsDTO } from './newspaper.dto';

@Controller('newspaper')
export class NewspaperController {
  constructor(private readonly newspaperService: NewspaperService) {}

  @Get()
  getNewspapers(@Query() query: NewspaperParamsDTO) {
    return this.newspaperService.getNewspapersByYear({ ...query });
  }
}
