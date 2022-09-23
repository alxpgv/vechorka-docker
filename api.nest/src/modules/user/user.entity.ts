import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PostMeta } from '../post/post-meta.entity';
import { Post } from '../post/post.entity';

@Entity('wp_users')
@Index('user_login_key', ['user_login'])
@Index('user_nicename', ['user_nicename'])
@Index('user_email', ['user_email'])
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  ID: number;

  @Column({ type: 'varchar', length: 60, default: '' })
  user_login: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  user_pass: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  user_nicename: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  user_email: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  user_url: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  user_registered: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  user_activation_key: string;

  @Column({ type: 'int', width: 11, default: 0 })
  user_status: number;

  @Column({ type: 'varchar', length: 250, default: '' })
  display_name: string;

  @OneToMany(() => Post, (post) => post.user, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'ID', referencedColumnName: 'post_author' })
  posts: Post[];
}
