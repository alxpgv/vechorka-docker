import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Term } from './term.entity';
import { Taxonomy } from './taxonomy.entity';
import { TaxonomyRelation } from './taxonomy-relation.entity';
import type { TaxonomiesProps } from './taxonomy.interface';

@Injectable()
export class TaxonomyService {
  constructor(
    @InjectRepository(Term)
    private readonly termRepository: Repository<Term>,
    @InjectRepository(Taxonomy)
    private readonly taxonomyRepository: Repository<Taxonomy>,
    @InjectRepository(TaxonomyRelation)
    private readonly taxonomyRelRepository: Repository<TaxonomyRelation>,
  ) {}

  getTaxonomies(): Promise<Taxonomy[]> {
    return this.taxonomyRepository.find({
      relations: { terms: true },
    });
  }

  getTaxonomy(taxonomy: string) {
    return this.taxonomyRepository.find({
      where: { taxonomy },
      relations: { terms: true },
    });
  }

  async getTaxonomiesGroup(): Promise<TaxonomiesProps> {
    const taxonomies = await this.taxonomyRepository.find({
      relations: { terms: true },
    });
    return this.responseTaxonomiesGroup(taxonomies);
  }

  private responseTaxonomiesGroup(taxonomies: Taxonomy[]): TaxonomiesProps {
    const data: TaxonomiesProps = { categories: [], geography: [], tags: [] };

    taxonomies.forEach((taxonomy) => {
      if (taxonomy.terms?.slug !== 'bez-rubriki') {
        const item = {
          id: Number(taxonomy.term_id),
          taxonomyId: Number(taxonomy.term_taxonomy_id),
          taxonomy: taxonomy.taxonomy,
          description: taxonomy.description,
          parent: Number(taxonomy.parent),
          count: Number(taxonomy.count),
          name: taxonomy.terms.name,
          slug: taxonomy.terms.slug,
        };

        if (taxonomy.taxonomy === 'category') {
          data.categories.push(item);
        }

        if (taxonomy.taxonomy === 'post_geography') {
          data.geography.push(item);
        }

        if (taxonomy.taxonomy === 'post_tag') {
          data.tags.push(item);
        }
      }
    });

    return data;
  }
}
