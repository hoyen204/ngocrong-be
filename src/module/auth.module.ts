import { Module } from '@nestjs/common';
import { AccountModule } from './account.module';
import { AuthService } from 'src/service';
import { AuthController } from 'src/controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guard/auth.guard';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 5000,
        limit: 2,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 10,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 15,
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
