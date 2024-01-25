import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { TheSieuReService } from 'src/service';
import { TheSieuReController } from 'src/controller';
import { ConfigModule } from '@nestjs/config';
import { RechargeModule } from './recharge.module';
import { AccountModule } from './account.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    RechargeModule,
    AccountModule,
  ],
  providers: [TheSieuReService],
  controllers: [TheSieuReController],
  exports: [TheSieuReService],
})
export class TheSieuReModule {}
