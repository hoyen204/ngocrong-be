import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import {
  decryptAES,
  encryptAES,
  encryptRSA,
  generateCheckSum,
} from 'src/common/utils';
import { dayjs } from 'src/config';
import { MomoTransactionHistory } from 'src/dto/momo';
import { MomoTransaction } from 'src/entities';
import { MomoService, TheSieuReService } from '.';
import { MomoTransactionService } from './momoTransaction.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BankService {
  constructor(
    private momoSerice: MomoService,
    private theSieuReService: TheSieuReService,
    private momoTransactionService: MomoTransactionService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private appVer = this.configService.get('MOMO_APP_VERSION');
  private appCode = this.configService.get('MOMO_APP_CODE');
  private ENCRYPT_KEY: string =
    '-----BEGIN RSA PUBLIC KEY-----\r\nMEgCQQDjtTNZJnbMWXON/mhhLzENzQW8TOH/gaOZ72u6FEzfjyWSfGsP6/rMIVjY\r\n2w44ZyqNG2p45PGmp3Y8bquPAQGnAgMBAAE=\r\n-----END RSA PUBLIC KEY-----\r\n';

  private magicString = '098765432109876543211234567890ab';
  private magicKey = encryptRSA(this.magicString, this.ENCRYPT_KEY);

  async browse(phone: string) {
    const momo = await this.momoSerice.getByPhone(phone);
    if (!momo) throw new NotFoundException(`Not found momo by phone ${phone}`);

    const time = new Date().getTime();
    const startDate = dayjs(new Date().setDate(1))
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    const endDate = dayjs(new Date());
    const limit = 50;
    const fromDate = dayjs(
      new Date().setHours(new Date().getHours() - 1),
    ).valueOf();
    const toDate = endDate.valueOf();

    const dataRequest = encryptAES(
      JSON.stringify({
        requestId: time,
        startDate: dayjs(startDate).format('DD/MM/YYYY'),
        endDate: dayjs(endDate).format('DD/MM/YYYY'),
        offset: 0,
        limit,
        lang: 'vi',
        channel: 'APP',
        appVer: this.appVer,
        appCode: this.appCode,
        deviceOS: 'IOS',
        buildNumber: 0,
        appId: 'vn.momo.transactionhistory',
      }),
      this.magicString,
    );

    const axiosConfig: AxiosRequestConfig = {
      url: 'https://api.momo.vn/transhis/api/transhis/browse',
      data: dataRequest,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        requestkey: this.magicKey,
        Authorization: `Bearer ${momo.jwtToken}`,
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.request(axiosConfig),
    );
    const response: MomoTransactionHistory = JSON.parse(
      decryptAES(data, this.magicString),
    );

    if (response.momoMsg && Array.isArray(response.momoMsg)) {
      const transactions = response.momoMsg;

      transactions.forEach(async (item) => {
        if (
          item.lastUpdate <= toDate &&
          item.lastUpdate >= fromDate &&
          (item.serviceId == 'transfer_p2p_globalsearch' ||
            item.serviceId == 'transfer_p2p_global_presearch' ||
            item.serviceId == 'transfer_via_link_w2w' ||
            item.serviceId == 'transfer_via_chat' ||
            item.serviceId == 'transfer_p2p' ||
            item.serviceId == 'transfer_myqr' ||
            item.serviceId == 'transfer_p2p_search_paste')
        ) {
          const check = await this.momoTransactionService.find({
            where: {
              transId: item.transId,
            },
          });

          if (!check || check.length == 0) {
            const transaction = plainToClass(MomoTransaction, item);
            transaction.id = null;
            await this.momoTransactionService.create(transaction);
            await this.detail(phone, transaction.transId, transaction.serviceId);
          }
        }
      });

      return transactions.length;
    }
  }

  async detail(phone: string, transId: number, serviceId: string) {
    const momo = await this.momoSerice.getByPhone(phone);
    if (!momo) throw new NotFoundException(`Not found momo by phone ${phone}`);
    const transaction = await this.momoTransactionService.findByTransId(
      transId,
    );
    if (!transaction) {
      return;
    }
    try {
      const time = new Date().getTime();
      const dataRequest = encryptAES(
        JSON.stringify({
          requestId: time,
          transId: transId,
          serviceId: serviceId,
          lang: 'vi',
          channel: 'APP',
          appVer: this.appVer,
          appCode: this.appCode,
          deviceOS: 'IOS',
          buildNumber: 0,
          appId: 'vn.momo.transactionhistory',
        }),
        this.magicString,
      );
      const axiosConfig: AxiosRequestConfig = {
        url: 'https://api.momo.vn/transhis/api/transhis/detail',
        data: dataRequest,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          requestkey: this.magicKey,
          Authorization: `Bearer ${momo.jwtToken}`,
        },
      };
      const { data } = await firstValueFrom(
        this.httpService.request(axiosConfig),
      );

      const response: MomoTransactionHistory = JSON.parse(
        decryptAES(data, this.magicString),
      );

      if (!Array.isArray(response.momoMsg)) {
        transaction.serviceData = response.momoMsg?.serviceData;
        transaction.oldData = response?.momoMsg?.oldData;
        const comment = response.momoMsg?.serviceData
          ? JSON.parse(response?.momoMsg?.serviceData)?.COMMENT_VALUE
          : response?.momoMsg?.oldData
          ? JSON.parse(response?.momoMsg?.oldData)?.commentValue
          : null;
        transaction.comment = comment;
      }

      await this.momoTransactionService.update(transaction);
    } catch (err) {
      console.log(err);
    }
  }

  async refreshToken(phone: string) {
    const momo = await this.momoSerice.getByPhone(phone);
    if (!momo) throw new NotFoundException(`Not found momo by phone ${phone}`);

    const time = new Date().getTime();
    const checkSum = generateCheckSum(momo, 'REFRESH_TOKEN_MSG', time);
    const dataRequest = JSON.stringify({
      user: momo.phone,
      msgType: 'REFRESH_TOKEN_MSG',
      momoMsg: {
        _class: 'mservice.backend.entity.msg.RefreshAccessTokenMsg',
        accessToken: momo.jwtToken,
      },
      extra: {
        IDFA: '',
        SIMULATOR: false,
        TOKEN: '',
        ONESIGNAL_TOKEN: '',
        SECUREID: '',
        MODELID: '',
        DEVICE_TOKEN: '',
        DEVICE_IMEI: momo.imei,
        checkSum,
      },
      appVer: this.appVer,
      appCode: this.appCode,
      lang: 'vi',
      deviceOS: 'ios',
      channel: 'APP',
      buildNumber: 0,
      appId: 'vn.momo.platform',
      cmdId: time + '000000',
      time,
    });
    const axiosConfig: AxiosRequestConfig = {
      url: 'https://api.momo.vn/auth/fast-login/refresh-token',
      data: dataRequest,
      method: 'POST',
      headers: {
        userid: momo.phone,
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${momo.refreshToken}`,
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.request(axiosConfig),
    );

    if (
      data.momoMsg &&
      data.momoMsg.accessToken &&
      data.momoMsg.accessToken !== momo.jwtToken
    ) {
      momo.jwtToken = data.momoMsg.accessToken;
      momo.updatedAt = new Date();
      await this.momoSerice.update(momo);
      return true;
    }
    return false;
  }
}
