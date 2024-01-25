import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Account } from 'src/entities';
import { md5 } from 'src/common/utils';
import { ChangePasswordDto } from 'src/dto/auth/changePassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.accountService.findByUsername(username);
    if (user?.password !== pass) {
      throw new HttpException('Login failed!', HttpStatusCode.Unauthorized);
    }
    const { password, ...result } = user;
    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, pass: string) {
    const user = await this.accountService.findByUsername(username);
    if (user) {
      throw new HttpException(
        'Username is already exists!',
        HttpStatusCode.Conflict,
      );
    }
    const account: Account = new Account();
    account.username = username;
    account.password = pass;

    await this.accountService.create(account);
  }

  async changePassword(changePasswordDto: ChangePasswordDto, req: any) {
    const user = await this.accountService.findByUsername(req.user.username);

    if (changePasswordDto.currPassword !== user.password) {
      throw new HttpException(
        'Current password is wrong.',
        HttpStatusCode.Unauthorized,
      );
    }

    user.password = changePasswordDto.newPassword;

    await this.accountService.update(user);
  }
}
