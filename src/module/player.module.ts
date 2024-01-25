import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [],
  exports: [],
})
export class PlayerModule {}
