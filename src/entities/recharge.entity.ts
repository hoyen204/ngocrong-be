import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from 'src/entities';

@Entity('recharge', { schema: 'dragonboy' })
export class Recharge {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'account_id' })
  accountId: number;

  @Column('varchar', { name: 'request_id', length: 150 })
  requestId: string;

  @Column('int', { name: 'declared_value', comment: 'Mệnh giá' })
  declaredValue: number;

  @Column('int', { name: 'value', nullable: true, comment: 'Mệnh giá thực' })
  value: number | null;

  @Column('int', {
    name: 'amount',
    nullable: true,
    comment: 'Số tiền nhận được',
  })
  amount: number | null;

  @Column('varchar', {
    name: 'telco',
    nullable: true,
    comment: 'Nhà mạng',
    length: 100,
  })
  telco: string | null;

  @Column('varchar', { name: 'serial', nullable: true, length: 100 })
  serial: string | null;

  @Column('varchar', { name: 'code', nullable: true, length: 100 })
  code: string | null;

  @Column('int', { name: 'status', nullable: true })
  status: number | null;

  @Column('varchar', { name: 'message', nullable: true, length: 150 })
  message: string | null;

  @Column('varchar', { name: 'sign', nullable: true, length: 100 })
  sign: string | null;

  @ManyToOne(() => Account, (account) => account.recharges, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: Account;
}
