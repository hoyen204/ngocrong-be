import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { PublicEndpoint } from 'src/decorator';
import { BankService } from 'src/service';

@Controller('bank')
export class BankController {
  constructor(private bankService: BankService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':phone')
  @PublicEndpoint()
  async getHistory(@Param() param) {
    return this.bankService.browse(param.phone);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/detail/:phone')
  @PublicEndpoint()
  async getDetail(
    @Param() param,
    @Query('transId') transId,
    @Query('serviceId') serviceId,
  ) {
    return this.bankService.detail(param.phone, transId, serviceId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/refreshToken/:phone')
  @PublicEndpoint()
  async refreshToken(@Param() param) {
    try {
      return await this.bankService.refreshToken(param.phone);
    } catch (err) {
      console.log({ headers: err.request._header });

      console.log('body', err.config.data);

      console.log('data', err.response.data);
    }
  }
}
