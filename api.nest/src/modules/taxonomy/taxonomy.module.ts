import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Term } from './term.entity';
import { TaxonomyService } from './taxonomy.service';
import { TaxonomyController } from './taxonomy.controller';
import { Taxonomy } from './taxonomy.entity';
import { TaxonomyRelation } from './taxonomy-relation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Term, Taxonomy, TaxonomyRelation])],
  providers: [TaxonomyService],
  controllers: [TaxonomyController],
  exports: [TaxonomyService],
})
export class TaxonomyModule {}
