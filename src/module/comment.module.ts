import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from 'src/controller';
import { Comment } from 'src/entities';
import { CommentService } from 'src/service';
import { AccountModule } from './account.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), AccountModule],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
