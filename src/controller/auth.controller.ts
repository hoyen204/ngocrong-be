import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from 'src/dto/auth';
import { AuthService } from 'src/service';
import { PublicEndpoint } from 'src/decorator/auth/auth.decorator';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ChangePasswordDto } from 'src/dto/auth/changePassword.dto';

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @PublicEndpoint()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @PublicEndpoint()
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.username, signUpDto.password);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('changePassword')
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
    return this.authService.changePassword(changePasswordDto, req);
  }
}
