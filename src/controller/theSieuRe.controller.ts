import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { HttpCode, Query } from '@nestjs/common/decorators';
import { PublicEndpoint } from 'src/decorator/auth/auth.decorator';
import { RechargeCallbackDto, RechargeCardDto } from 'src/dto/thesieure';
import { TheSieuReService } from 'src/service/theSieuRe.service';

@Controller('card')
export class TheSieuReController {
  constructor(private theSieuReService: TheSieuReService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async rechargeCard(@Body() rechargeCardDto: RechargeCardDto, @Request() req) {
    return await this.theSieuReService.rechargeCard(rechargeCardDto, req);
  }

  @HttpCode(HttpStatus.OK)
  @Get('momo')
  async getRechargeMomo(@Query('value') value, @Request() req) {
    return await this.theSieuReService.getRechargeMomo(value, req);
  }

  @PublicEndpoint()
  @Get('/cardDetails')
  async getCardDetails() {
    return await this.theSieuReService.getCardDetails();
  }

  @PublicEndpoint()
  @Post('/callback')
  @HttpCode(200)
  async callback(@Body() cardCallback: RechargeCallbackDto) {
    return await this.theSieuReService.callbackHandler(cardCallback);
  }
}
