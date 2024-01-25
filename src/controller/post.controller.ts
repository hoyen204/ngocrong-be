import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { PublicEndpoint } from 'src/decorator';
import { AccountDto, PlayerDto, PostDto } from 'src/dto';
import { PagingOptionsDto } from 'src/dto/paging';
import { CreatePostDto } from 'src/dto/post';
import { CommentDto } from 'src/dto/post/comment.dto';
import { PostService } from 'src/service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @PublicEndpoint()
  @Get('notifications')
  async getNotifications() {
    return await this.postService.getNotifications();
  }

  @HttpCode(HttpStatus.OK)
  @PublicEndpoint()
  @Get()
  async getPostsCreteria(@Query() pageOptionsDto: PagingOptionsDto) {
    return this.postService.getPosts(pageOptionsDto);
  }

  @HttpCode(HttpStatus.OK)
  @PublicEndpoint()
  @Get(':id')
  async getPostDetail(@Param() param: number) {
    const entity = await this.postService.getById(param['id']);

    if (!entity)
      throw new NotFoundException(`Post id ${param['id']} is not found.`);

    const postAccountDto = plainToClass(AccountDto, entity.account);
    postAccountDto.player = plainToClass(PlayerDto, entity.account.player);

    const commentDtos = plainToInstance(CommentDto, entity.comments);
    const postDto = plainToClass(PostDto, entity);

    commentDtos.forEach((comment) => {
      const commentAccoundDto = plainToClass(AccountDto, comment.account);
      commentAccoundDto.player = plainToClass(
        PlayerDto,
        comment.account.player,
      );
      comment.account = commentAccoundDto;
    });

    postDto.account = postAccountDto;
    postDto.comments = commentDtos;
    return postDto;
  }

  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.CONFLICT)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req: any) {
    await this.postService.createByDto(createPostDto, req);
  }
}
