import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AccountService } from './account.service';
import { BankService } from './bank.service';
import { MomoTransactionService } from './momoTransaction.service';
import { RechargeService } from './recharge.service';

@Injectable()
export class CronTaskService {
  constructor(
    private bankService: BankService,
    private momoTransactionService: MomoTransactionService,
    private rechargeService: RechargeService,
    private accountService: AccountService,
  ) {}
  private readonly logger = new Logger(CronTaskService.name);

  @Cron(CronExpression.EVERY_MINUTE)
  async handleTransactionHistory() {
    const phoneNumber = '0823222627';
    try {
      const count = await this.bankService.browse(phoneNumber);
      count &&
        this.logger.log(
          `Get ${count} transaction${count > 0 && 's'} of ${phoneNumber} done`,
        );
    } catch (err) {
      this.logger.error(`Error handleTransactionHistory`);
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleRefreshToken() {
    const phoneNumber = '0823222627';
    try {
      const done = await this.bankService.refreshToken(phoneNumber);
      done && this.logger.log(`Token has been refresh`);
    } catch (err) {
      this.logger.error(`Error handleTransactionHistory ${err}`);
    }
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  // async handleUpdateComment() {
  //   const phoneNumber = '0823222627';

  //   const transactions = await this.momoTransactionService.findUnhandled();
  //   try {
  //     transactions.forEach(async (transaction) => {
  //       await this.bankService.detail(
  //         phoneNumber,
  //         transaction.transId,
  //         transaction.serviceId,
  //       );
  //     });
  //   } catch (err) {
  //     this.logger.error(`Error handleMomoTransaction ${err}`);
  //   }
  // }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleMomoPending() {
    let valueReceive = 0;
    const pendings = await this.rechargeService.findMomoPending();
    try {
      pendings.forEach(async (pending) => {
        const transactions = await this.momoTransactionService.find({
          where: {
            comment: pending.requestId,
            io: 1,
            isHandled: false,
          },
        });
        if (transactions.length > 1) {
          const errorMessage = `Conflict ${pending.requestId}`;
          pending.status = 3;
          pending.message = errorMessage;
          await this.rechargeService.update(pending);
          throw new ConflictException(errorMessage);
        } else if (transactions.length > 0) {
          const transaction = transactions[0];
          if (+transaction.totalOriginalAmount !== pending.declaredValue) {
            pending.status = 3;
            pending.message = 'Nạp sai mệnh giá';
          } else {
            pending.status = 1;
            pending.message = 'Thành công';
          }
          transaction.isHandled = true;

          const username = pending.requestId.split('_')[0];
          const account = await this.accountService.findByUsername(username);

          if (account) {
            valueReceive =
              pending.declaredValue * (pending.status === 3 ? 0.9 : 1);
            account.coin += valueReceive; // todo maybe add bonus recharge
          }

          pending.value = valueReceive;
          pending.amount = valueReceive;

          await this.momoTransactionService.update(transaction);
          await this.rechargeService.update(pending);
          await this.accountService.updateCoin(account);
        }
      });
      this.logger.log('handleMomoPending done');
    } catch (err) {
      this.logger.error(`Error handleMomoTransaction ${err}`);
    }
  }
}
