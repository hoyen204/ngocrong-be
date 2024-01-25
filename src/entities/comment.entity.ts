import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account, Post } from 'src/entities';

@Index('post_id', ['postId'], {})
@Entity('comment', { schema: 'dragonboy' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('int', { name: 'account_id' })
  accountId: number;

  @Column('bigint', { name: 'post_id' })
  postId: string;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('timestamp', { name: 'created', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
  post: Post;

  @ManyToOne(() => Account, (account) => account.comments, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: Account;
}
