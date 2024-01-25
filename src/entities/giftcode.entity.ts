import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('giftcode', { schema: 'dragonboy' })
export class Giftcode {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'code', length: 255 })
  code: string;

  @Column('int', { name: 'count_left' })
  countLeft: number;

  @Column('text', { name: 'detail' })
  detail: string;

  @Column('timestamp', {
    name: 'datecreate',
    default: () => Date.now(),
  })
  datecreate: Date;

  @Column('timestamp', { name: 'expired', nullable: true })
  expired: Date | null;

  @Column('text', { name: 'itemoption' })
  itemoption: string;

  @Column('varchar', { name: 'listUser', length: 1000, default: () => "'[]'" })
  listUser: string;
}
