import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity('wp_comments')
@Index('comment_post_ID', ['comment_post_ID'])
@Index('comment_approved_date_gmt', ['comment_approved', 'comment_date_gmt'])
@Index('comment_date_gmt', ['comment_date_gmt'])
@Index('comment_parent', ['comment_parent'])
@Index('comment_author_email', ['comment_author_email'])
export class Comment {
  @PrimaryGeneratedColumn({ unsigned: true })
  comment_ID: number;

  @Column({ type: 'bigint', width: 20, default: 0, unsigned: true })
  comment_post_ID: number;

  @Column({ type: 'tinytext' })
  comment_author: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  comment_author_email: string;

  @Column({ type: 'varchar', length: 200, default: '' })
  comment_author_url: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  comment_author_IP: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  comment_date: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  comment_date_gmt: Date;

  @Column({ type: 'text' })
  comment_content: string;

  @Column({ type: 'int', width: 11, default: 0 })
  comment_karma: number;

  @Column({ type: 'varchar', length: 20, default: 1 })
  comment_approved: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  comment_agent: string;

  @Column({ type: 'varchar', length: 20, default: 'comment' })
  comment_type: string;

  @Column({ type: 'bigint', width: 20, default: 0, unsigned: true })
  comment_parent: number;

  @Column({ type: 'bigint', width: 20, default: 0, unsigned: true })
  user_id: number;

  @ManyToOne(() => Post, (post) => post.comment, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'comment_post_ID', referencedColumnName: 'ID' })
  post: Post;
}
