import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateCommentDto } from 'src/dto';
import { Comment } from 'src/entities';
import { Repository } from 'typeorm';
import { AccountService } from './account.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentService: Repository<Comment>,
    private readonly accountService: AccountService,
  ) {}

  async create(createCommentDto: CreateCommentDto, req: any) {
    const comment = plainToClass(Comment, createCommentDto);
    const user = await this.accountService.getById(req.user.sub, true);
    if (!user.player)
      throw new ConflictException(
        'Tài khoản chưa tạo nhân vật không thể bình luận bài viết',
      );
    comment.accountId = req.user.sub;
    await this.commentService.insert(comment);
  }
}
