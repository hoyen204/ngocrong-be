import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account, Comment } from 'src/entities';

@Index('FKpijp3eahwssnf3qu27bydj928', ['accountId'], {})
@Entity('post', { schema: 'dragonboy' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('timestamp', {
    name: 'created_at',
    default: () => new Date(),
  })
  createdAt: Date;

  @Column('enum', {
    name: 'status',
    enum: ['WAITING_FOR_APPROVAL', 'APPROVED', 'PROCESSED', 'LOCKED'],
    default: () => "'APPROVED'",
  })
  status: 'WAITING_FOR_APPROVAL' | 'APPROVED' | 'PROCESSED' | 'LOCKED';

  @Column('enum', {
    name: 'state',
    enum: ['NONE', 'HOT', 'NEW'],
    default: () => "'NONE'",
  })
  state: 'NONE' | 'HOT' | 'NEW';

  @Column('int', { name: 'account_id' })
  accountId: number;

  @Column('boolean', {
    name: 'is_notification',
    default: false,
  })
  isNotification: boolean;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => Account, (account) => account.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: Account;
}
