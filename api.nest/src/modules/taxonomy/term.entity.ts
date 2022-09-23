import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Taxonomy } from './taxonomy.entity';

@Entity('wp_terms')
@Index('name', ['name'])
@Index('slug', ['slug'])
export class Term {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  term_id: number;

  @Column({ type: 'varchar', length: 200, default: '' })
  name: string;

  @Column({ type: 'varchar', length: 200, default: '' })
  slug: string;

  @Column({ type: 'bigint', width: 10, default: 0 })
  term_group: number;

  @OneToOne(() => Taxonomy, (taxonomy) => taxonomy.terms, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'term_id', referencedColumnName: 'term_id' })
  taxonomy: Taxonomy;
}
