import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Momo } from 'src/entities';
import { TheSieuReModule } from './theSieuRe.module';
import { BankService, MomoTransactionService } from 'src/service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MomoModule } from './momo.module';
import { BankController } from 'src/controller';
import { MomoTransactionModule } from './momoTransaction.module';

@Module({
  imports: [
    MomoModule,
    TheSieuReModule,
    MomoTransactionModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  providers: [BankService],
  controllers: [BankController],
  exports: [BankService],
})
export class BankModule {}
