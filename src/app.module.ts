import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './guard/auth.guard';
import { AccountModule } from './module/account.module';
import { AuthModule } from './module/auth.module';
import { CommentModule } from './module/comment.module';
import { PlayerModule } from './module/player.module';
import { PostModule } from './module/post.module';
import { TheSieuReModule } from './module/theSieuRe.module';
import { MomoModule } from './module/momo.module';
import { BankModule } from './module/bank.module';
import { MomoTransactionModule } from './module/momoTransaction.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronTaskModule } from './module/cronTask.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `.env.dev`,
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
        limit: 50,
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DATABASE'),
        entities: [__dirname + '/entities/*.entity.ts'],
        autoLoadEntities: true,
        // synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AccountModule,
    CommentModule,
    PlayerModule,
    PostModule,
    TheSieuReModule,
    MomoModule,
    BankModule,
    MomoTransactionModule,
    // CronTaskModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
  ],
})
export class AppModule {}
