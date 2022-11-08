import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { PostModule } from '../post/post.module';
import { TaxonomyModule } from '../taxonomy/taxonomy.module';

@Module({
  imports: [PostModule, TaxonomyModule],
  providers: [SettingsService],
  controllers: [SettingsController],
  exports: [SettingsService],
})
export class SettingsModule {}
