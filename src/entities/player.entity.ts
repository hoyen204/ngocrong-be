import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from 'src/entities';

@Index('account_id', ['accountId'], { unique: true })
@Entity('player', { schema: 'dragonboy' })
export class Player {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'account_id', nullable: true, unique: true })
  accountId: number | null;

  @Column('varchar', { name: 'name', length: 20 })
  name: string;

  @Column('int', { name: 'head', default: () => "'102'" })
  head: number;

  @Column('int', { name: 'gender' })
  gender: number;

  @Column('tinyint', {
    name: 'have_tennis_space_ship',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  haveTennisSpaceShip: boolean | null;

  @Column('int', { name: 'clan_id_sv1', default: () => "'-1'" })
  clanIdSv1: number;

  @Column('int', { name: 'clan_id_sv2', default: () => "'-1'" })
  clanIdSv2: number;

  @Column('text', { name: 'data_inventory' })
  dataInventory: string;

  @Column('text', { name: 'data_location' })
  dataLocation: string;

  @Column('text', { name: 'data_point' })
  dataPoint: string;

  @Column('text', { name: 'data_magic_tree' })
  dataMagicTree: string;

  @Column('text', { name: 'items_body' })
  itemsBody: string;

  @Column('text', { name: 'items_bag' })
  itemsBag: string;

  @Column('text', { name: 'items_box' })
  itemsBox: string;

  @Column('text', { name: 'items_box_lucky_round' })
  itemsBoxLuckyRound: string;

  @Column('text', { name: 'friends' })
  friends: string;

  @Column('text', { name: 'enemies' })
  enemies: string;

  @Column('text', { name: 'data_intrinsic' })
  dataIntrinsic: string;

  @Column('text', { name: 'data_item_time' })
  dataItemTime: string;

  @Column('text', { name: 'data_task' })
  dataTask: string;

  @Column('text', { name: 'data_mabu_egg' })
  dataMabuEgg: string;

  @Column('text', { name: 'data_charm' })
  dataCharm: string;

  @Column('text', { name: 'skills' })
  skills: string;

  @Column('text', { name: 'skills_shortcut' })
  skillsShortcut: string;

  @Column('text', { name: 'pet' })
  pet: string;

  @Column('text', { name: 'data_black_ball' })
  dataBlackBall: string;

  @Column('text', { name: 'data_side_task' })
  dataSideTask: string;

  @Column('timestamp', {
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column('int', { name: 'violate', default: () => "'0'" })
  violate: number;

  @Column('int', { name: 'pointPvp', nullable: true, default: () => "'0'" })
  pointPvp: number | null;

  @Column('int', {
    name: 'NguHanhSonPoint',
    nullable: true,
    default: () => "'0'",
  })
  nguHanhSonPoint: number | null;

  @Column('text', { name: 'data_card' })
  dataCard: string;

  @Column('text', { name: 'bill_data' })
  billData: string;

  @Column('varchar', {
    name: 'data_item_time_sieu_cap',
    length: 255,
    default: () => "'[0,0,0,0,0]'",
  })
  dataItemTimeSieuCap: string;

  @OneToOne(() => Account, (account) => account.player, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: Account;
}
