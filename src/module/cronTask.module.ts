import { Module } from '@nestjs/common';
import { BankService, MomoTransactionService } from 'src/service';
import { CronTaskService } from 'src/service/cronTask.service';
import { MomoModule } from './momo.module';
import { TheSieuReModule } from './theSieuRe.module';
import { MomoTransactionModule } from './momoTransaction.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { BankModule } from './bank.module';
import { RechargeModule } from './recharge.module';
import { AccountModule } from './account.module';

@Module({
  imports: [BankModule, MomoTransactionModule, RechargeModule,AccountModule],
  providers: [CronTaskService],
  exports: [CronTaskService],
})
export class CronTaskModule {}
