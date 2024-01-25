import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CreateCommentDto } from 'src/dto/post';
import { CommentService } from 'src/service/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  @Post()
  async createComment(
    @Body() CreateCommentDto: CreateCommentDto,
    @Request() req: any,
  ) {
    await this.commentService.create(CreateCommentDto, req);
  }
}
