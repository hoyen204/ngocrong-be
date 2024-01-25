import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment, Player } from 'src/entities';
import { Post } from 'src/entities';
import { Recharge } from 'src/entities';

@Index('username', ['username'], { unique: true })
@Entity('account', { schema: 'dragonboy' })
export class Account {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'username', unique: true, length: 20 })
  username: string;

  @Column('varchar', { name: 'password', length: 100 })
  password: string;

  @Column('timestamp', {
    name: 'create_time',
    nullable: true,
    default: () => Date.now(),
  })
  createTime: Date | null;

  @Column('timestamp', {
    name: 'update_time',
    nullable: true,
    default: () => Date.now(),
  })
  updateTime: Date | null;

  @Column('smallint', { name: 'ban', default: () => "'0'" })
  ban: number;

  @Column('int', { name: 'point_post', default: () => "'0'" })
  pointPost: number;

  @Column('int', { name: 'last_post', default: () => "'0'" })
  lastPost: number;

  @Column('int', { name: 'role', default: () => "'-1'" })
  role: number;

  @Column('tinyint', { name: 'is_admin', width: 1, default: () => "'0'" })
  isAdmin: boolean;

  @Column('timestamp', {
    name: 'last_time_login',
    default: () => Date.now(),
  })
  lastTimeLogin: Date;

  @Column('timestamp', {
    name: 'last_time_logout',
    default: () => Date.now(),
  })
  lastTimeLogout: Date;

  @Column('varchar', { name: 'ip_address', nullable: true, length: 50 })
  ipAddress: string | null;

  @Column('int', { name: 'active', default: () => "'0'" })
  active: number;

  @Column('int', { name: 'thoi_vang', default: () => "'0'" })
  thoiVang: number;

  @Column('int', { name: 'server_login', default: () => "'-1'" })
  serverLogin: number;

  @Column('double', {
    name: 'bd_player',
    nullable: true,
    precision: 22,
    default: () => "'1'",
  })
  bdPlayer: number | null;

  @Column('tinyint', {
    name: 'is_gift_box',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isGiftBox: boolean | null;

  @Column('varchar', {
    name: 'gift_time',
    nullable: true,
    length: 255,
    default: () => "'0'",
  })
  giftTime: string | null;

  @Column('longtext', { name: 'reward', nullable: true })
  reward: string | null;

  @Column('int', { name: 'tongnap', default: () => "'0'" })
  tongnap: number;

  @Column('int', { name: 'coin', default: () => "'0'" })
  coin: number;

  @OneToOne(() => Player, (player) => player.account)
  player: Player;

  @OneToMany(() => Post, (post) => post.account)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.account)
  comments: Comment[];

  @OneToMany(() => Recharge, (recharge) => recharge.account)
  recharges: Recharge[];
}
