import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Recharge } from 'src/entities/';
import { RechargeService } from 'src/service';

@Module({
  imports: [TypeOrmModule.forFeature([Recharge])],
  providers: [RechargeService],
  exports: [RechargeService],
})
export class RechargeModule {}
