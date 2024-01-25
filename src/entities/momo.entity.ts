import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('momo', { schema: 'dragonboy' })
export class Momo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'phone', length: 10 })
  phone: string;

  @Column('varchar', { name: 'imei', length: 64 })
  imei: string;

  @Column('text', { name: 'setupKey', nullable: true })
  setupKey: string | null;

  @Column('text', { name: 'phash', nullable: true })
  phash: string | null;

  @Column('text', { name: 'password', nullable: true })
  password: string | null;

  @Column('text', { name: 'otp', nullable: true })
  otp: string | null;

  @Column('tinyint', { name: 'status', nullable: true })
  status: number | null;

  @Column('text', { name: 'jwt_token', nullable: true })
  jwtToken: string | null;

  @Column('text', { name: 'refresh_token', nullable: true })
  refreshToken: string | null;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => new Date(),
  })
  createdAt: Date | null;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date | null;
}
