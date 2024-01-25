import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('momo_transaction', { schema: 'dragonboy' })
export class MomoTransaction {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('bigint', { name: 'trans_id' })
  transId: number;

  @Column('varchar', { name: 'service_id', length: 255 })
  serviceId: string;

  @Column('timestamp', { name: 'last_update', nullable: true })
  lastUpdate: number | null;

  @Column('int', { name: 'status', nullable: true })
  status: number | null;

  @Column('bigint', { name: 'total_original_amount', nullable: true })
  totalOriginalAmount: string | null;

  @Column('bigint', { name: 'total_amount', nullable: true })
  totalAmount: string | null;

  @Column('varchar', { name: 'source_id', nullable: true, length: 255 })
  sourceId: string | null;

  @Column('varchar', { name: 'source_name', nullable: true, length: 255 })
  sourceName: string | null;

  @Column('varchar', { name: 'target_id', nullable: true, length: 255 })
  targetId: string | null;

  @Column('varchar', { name: 'target_name', nullable: true, length: 255 })
  targetName: string | null;

  @Column('tinyint', { name: 'io', nullable: true, width: 1 })
  io: number | null;

  @Column('varchar', { name: 'service_name', nullable: true, length: 255 })
  serviceName: string | null;

  @Column('int', { name: 'created_at', nullable: true })
  createdAt: number | null;

  @Column('text', { name: 'old_data', nullable: true })
  oldData: string | null;

  @Column('text', { name: 'service_data', nullable: true })
  serviceData: string | null;

  @Column('text', { name: 'comment', nullable: true })
  comment: string | null;

  @Column('tinyint', { name: 'is_deleted', nullable: true, width: 1 })
  isDeleted: boolean | null;

  @Column('tinyint', {
    name: 'is_handled',
    nullable: true,
    width: 1,
    default: () => false,
  })
  isHandled: boolean | null;
}
