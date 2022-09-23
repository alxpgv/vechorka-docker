import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Term } from './term.entity';
import { TaxonomyRelation } from './taxonomy-relation.entity';

@Entity('wp_term_taxonomy')
@Unique('term_id_taxonomy', ['term_id', 'taxonomy'])
@Index('taxonomy', ['taxonomy'])
export class Taxonomy {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  term_taxonomy_id: number;

  @Column({ type: 'bigint', width: 20, default: 0, unsigned: true })
  term_id: number;

  @Column({ type: 'varchar', length: 32, default: '' })
  taxonomy: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'bigint', width: 20, default: 0, unsigned: true })
  parent: number;

  @Column({ type: 'bigint', width: 20, default: 0 })
  count: number;

  @ManyToOne(() => Taxonomy)
  @JoinColumn({ name: 'term_taxonomy_id', referencedColumnName: 'parent' })
  children: Taxonomy[];

  @OneToMany(
    () => TaxonomyRelation,
    (taxonomyRelation) => taxonomyRelation.taxonomy,
    {
      createForeignKeyConstraints: false,
    },
  )
  @JoinColumn({
    name: 'term_taxonomy_id',
    referencedColumnName: 'term_taxonomy_id',
  })
  post_taxonomy: TaxonomyRelation[];

  @OneToOne(() => Term, (term) => term.taxonomy, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'term_id', referencedColumnName: 'term_id' })
  terms: Term;
}
