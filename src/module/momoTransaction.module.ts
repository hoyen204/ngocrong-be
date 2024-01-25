import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MomoTransaction } from 'src/entities';
import { MomoTransactionService } from 'src/service';

@Module({
  imports: [TypeOrmModule.forFeature([MomoTransaction])],
  providers: [MomoTransactionService],
  controllers: [],
  exports: [MomoTransactionService],
})
export class MomoTransactionModule {}
