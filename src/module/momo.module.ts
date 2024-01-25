import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Momo } from 'src/entities';
import { TheSieuReModule } from './theSieuRe.module';
import { MomoService } from 'src/service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Momo]),
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TheSieuReModule,
  ],
  providers: [MomoService],
  controllers: [],
  exports: [MomoService],
})
export class MomoModule {}
