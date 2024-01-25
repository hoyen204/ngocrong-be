import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Get,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { AccountDto, PlayerDto, PostDto, RechargeDto } from 'src/dto';
import { AccountService } from 'src/service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getDetail(@Request() req) {
    const account = await this.accountService.getById(req.user.sub,true);
    const dto = plainToClass(AccountDto, account);
    dto.player = plainToClass(PlayerDto, account.player);
    dto.recharges = plainToInstance(RechargeDto, account.recharges);
    dto.posts = plainToInstance(PostDto, account.posts);
    return dto;
  }
}
