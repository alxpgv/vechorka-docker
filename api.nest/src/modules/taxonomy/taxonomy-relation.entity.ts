import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Taxonomy } from './taxonomy.entity';

@Entity('wp_term_relationships')
@Index('term_taxonomy_id', ['term_taxonomy_id'])
export class TaxonomyRelation {
  @PrimaryColumn({ type: 'bigint', width: 20, default: 0, unsigned: true })
  object_id: number;

  @PrimaryColumn({ type: 'bigint', width: 20, default: 0, unsigned: true })
  term_taxonomy_id: number;

  @Column({ type: 'int', width: 11, default: 0 })
  term_order: number;

  @ManyToOne(() => Post, (post) => post.post_taxonomy, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'object_id', referencedColumnName: 'ID' })
  post: Post;

  @ManyToOne(() => Taxonomy, (taxonomy) => taxonomy.post_taxonomy, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'term_taxonomy_id',
    referencedColumnName: 'term_taxonomy_id',
  })
  taxonomy: Taxonomy;
}
