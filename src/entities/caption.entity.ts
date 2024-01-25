import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('caption', { schema: 'dragonboy' })
export class Caption {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'NAME', length: 255 })
  name: string;
}
