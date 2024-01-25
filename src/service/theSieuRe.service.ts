import { Injectable } from '@nestjs/common';
import { constants } from 'src/common/constants';
import {
  RechargeCallbackDto,
  CardInfoDto,
  RechargeCardDto,
} from 'src/dto/thesieure';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig, HttpStatusCode } from 'axios';
import { AccountService, RechargeService } from '.';
import { HttpException } from '@nestjs/common';
import { md5 } from 'src/common/utils';
import { plainToClass } from 'class-transformer';
import { Recharge } from 'src/entities';

@Injectable()
export class TheSieuReService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private rechargeService: RechargeService,
    private accountService: AccountService,
  ) {}

  private partner_id = this.configService.get('PARTNER_ID');
  private partner_key = this.configService.get('PARTNER_KEY');

  async rechargeCard(
    rechargeCardDto: RechargeCardDto,
    req: any,
  ): Promise<RechargeCardDto> {
    const url = `${constants.ENDPOINT_THE_SIEU_RE}`;
    const minVal = 100000000;
    const maxVal = 999999999;
    const command = 'charging';
    const request_id = Math.floor(
      Math.random() * (maxVal - minVal + 1) + minVal,
    );
    const sign = md5(
      this.partner_key + rechargeCardDto.code + rechargeCardDto.serial,
    );
    const formData = new FormData();
    formData.append('command', command);
    formData.append('request_id', `${request_id}`);
    formData.append('partner_id', `${this.partner_id}`);
    formData.append('sign', `${sign}`);

    const recharge = plainToClass(Recharge, rechargeCardDto);
    recharge.declaredValue = recharge.amount;
    recharge.sign = sign;
    recharge.requestId = `${request_id}`;
    recharge.accountId = req.user.sub;

    Object.keys(rechargeCardDto).forEach((key) =>
      formData.append(key, rechargeCardDto[key]),
    );

    const axiosConfig: AxiosRequestConfig = {
      url,
      method: 'POST',
      params: {
        partner_id: this.partner_id,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    };

    const { data } = await firstValueFrom(
      this.httpService.request(axiosConfig),
    );

    await this.rechargeService.create(recharge);

    return data;
  }

  async getCardDetails(): Promise<CardInfoDto[]> {
    const url = `${constants.ENDPOINT_THE_SIEU_RE}/getfee`;
    const axiosConfig: AxiosRequestConfig = {
      url,
      method: 'get',
      params: {
        partner_id: this.partner_id,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.request(axiosConfig),
    );

    return data;
  }

  async callbackHandler(cardCallback: RechargeCallbackDto): Promise<any> {
    // console.log(cardCallback);
    let recharge = await this.rechargeService.getBySign(
      cardCallback.callback_sign,
    );
    if (!recharge)
      throw new HttpException(`Not found payment`, HttpStatusCode.NotFound);
    Object.keys(cardCallback).map((key) => {
      if (key in recharge) recharge[key] = cardCallback[key];
    });
    this.rechargeService.update(recharge);
    if (cardCallback.status == 1 || cardCallback.status == 2) {
      const account = await this.accountService.getById(recharge.accountId);
      console.log(account);
      if (account) {
        account.coin += cardCallback.declared_value / cardCallback.status;
      }
      await this.accountService.update(account);
    }
    return { status: true };
  }

  async getRechargeMomo(value: number, req: any) {
    const recharge = await this.rechargeService.findMomo(req.user.sub);
    const minVal = 10000;
    const maxVal = 100000;
    const randomId = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
    if (!recharge) {
      await this.rechargeService.create({
        accountId: req.user.sub,
        requestId: `${req.user.username}_${randomId}`,
        status: 99,
        message: 'PENDING',
        declaredValue: value,
        telco: 'MOMO',
      });
    } else {
      recharge.requestId = `${req.user.username}_${randomId}`;
      recharge.declaredValue = value;
      await this.rechargeService.update(recharge);
    }
    return { data: `${req.user.username}_${randomId}` };
  }

  //todo: create bonus recharge.
}
