import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('account_id', ['accountId'], { unique: true })
@Index('UK_1l8br3dq53yfan1deqeb246os', ['accountId'], { unique: true })
@Entity('token', { schema: 'dragonboy' })
export class Token {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'token_id' })
  tokenId: string;

  @Column('varchar', { name: 'CODE', length: 50 })
  code: string;

  @Column('timestamp', { name: 'created', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column('int', { name: 'account_id', unique: true })
  accountId: number;

  @Column('date', { name: 'expiry', nullable: true })
  expiry: string | null;
}
