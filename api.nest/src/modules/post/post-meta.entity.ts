import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('wp_postmeta')
@Index('post_id', ['post_id'])
@Index('meta_key', ['meta_key'])
export class PostMeta {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  meta_id: number;

  @Column({ type: 'bigint', width: 20, default: 0, unsigned: true })
  post_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_key: string;

  @Column({ type: 'longtext', nullable: true })
  meta_value: string;

  @ManyToOne(() => PostMeta)
  @JoinColumn({ name: 'meta_value', referencedColumnName: 'post_id' })
  children: PostMeta[];

  @ManyToOne(() => Post, (post) => post.meta, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'ID' })
  post: Post;
}
