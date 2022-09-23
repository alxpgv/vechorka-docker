import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostMeta } from './post-meta.entity';
import { TaxonomyRelation } from '../taxonomy/taxonomy-relation.entity';
import { User } from '../user/user.entity';

@Entity('wp_posts')
@Index('type_status_date', ['post_type', 'post_status', 'post_date', 'ID'])
@Index('post_name', ['post_name'])
@Index('post_parent', ['post_parent'])
@Index('post_author', ['post_author'])
export class Post {
  @PrimaryGeneratedColumn({ unsigned: true })
  ID: number;

  @Column({ type: 'bigint', width: 20, default: 0, unsigned: true })
  post_author: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  post_date: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  post_date_gmt: string;

  @Column({ type: 'longtext' })
  post_content: string;

  @Column({ type: 'text' })
  post_title: string;

  @Column({ type: 'text' })
  post_excerpt: string;

  @Column({ type: 'varchar', length: 20, default: 'publish' })
  post_status: string;

  @Column({ type: 'varchar', length: 20, default: 'open' })
  comment_status: string;

  @Column({ type: 'varchar', length: 20, default: 'open' })
  ping_status: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  post_password: string;

  @Column({ type: 'varchar', length: 200, default: '' })
  post_name: string;

  @Column({ type: 'text' })
  to_ping: string;

  @Column({ type: 'text' })
  pinged: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  post_modified: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  post_modified_gmt: string;

  @Column({ type: 'longtext' })
  post_content_filtered;

  @Column({ type: 'bigint', width: 20, default: 0, unsigned: true })
  post_parent: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  guid: string;

  @Column({ type: 'int', width: 11, default: 0 })
  menu_order: number;

  @Column({ type: 'varchar', length: 20, default: 'post' })
  post_type: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  post_mime_type: string;

  @Column({ type: 'bigint', width: 20, default: 0 })
  comment_count: number;

  @OneToMany(
    () => TaxonomyRelation,
    (taxonomyRelation) => taxonomyRelation.post,
    {
      createForeignKeyConstraints: false,
    },
  )
  @JoinColumn({ name: 'ID', referencedColumnName: 'object_id' })
  post_taxonomy: TaxonomyRelation[];

  @OneToMany(() => PostMeta, (meta) => meta.post, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'ID', referencedColumnName: 'post_id' })
  meta: PostMeta[];

  @ManyToOne(() => User, (user) => user.posts, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'post_author', referencedColumnName: 'ID' })
  user: User;
}
