import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { AccountDto, PlayerDto } from 'src/dto';
import { PagingDto, PagingMetaDto, PagingOptionsDto } from 'src/dto/paging';
import { CreatePostDto, PostDto } from 'src/dto/post';
import { Post } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async getById(id: number): Promise<Post> {
    return await this.postRepo.findOne({
      where: {
        id,
      },
      relations: [
        'account',
        'comments',
        'account.player',
        'comments.account',
        'comments.account.player',
      ],
      order: {
        comments: {
          created: 'ASC',
        },
      },
    });
  }

  async getNotifications(): Promise<PostDto[]> {
    const queryBuilder = this.postRepo.createQueryBuilder('post');

    queryBuilder
      .where('post.status != :status && post.is_notification = 1', {
        status: 'LOCKED',
      })
      .orderBy('post.createdAt', 'ASC')
      .leftJoinAndSelect('post.account', 'account')
      .leftJoinAndSelect('account.player', 'player');
    const { entities } = await queryBuilder.getRawAndEntities();

    const dtos = plainToInstance(PostDto, entities);

    dtos.forEach((entity) => {
      const accountDto = plainToClass(AccountDto, entity.account);
      accountDto.player = plainToClass(PlayerDto, entity.account.player);
      entity.account = accountDto;
    });

    return dtos;
  }

  async getPosts(
    pageOptionsDto: PagingOptionsDto,
  ): Promise<PagingDto<PostDto>> {
    // console.log({ pageOptionsDto });
    const queryBuilder = this.postRepo.createQueryBuilder('post');

    queryBuilder
      .where('post.status != :status && post.is_notification = 0', {
        status: 'LOCKED',
      })
      .orderBy('post.createdAt', pageOptionsDto.order)
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take)
      .leftJoinAndSelect('post.account', 'account')
      .leftJoinAndSelect('account.player', 'player');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PagingMetaDto({ itemCount, pageOptionsDto });

    const dtos = plainToInstance(PostDto, entities);

    dtos.forEach((entity) => {
      const accountDto = plainToClass(AccountDto, entity.account);
      accountDto.player = plainToClass(PlayerDto, entity.account.player);
      entity.account = accountDto;
    });

    return new PagingDto(dtos, pageMetaDto);
  }

  async create(post: Post) {
    await this.postRepo.insert(post);
  }

  async createByDto(postDto: CreatePostDto, req: any) {
    const post = plainToClass(Post, postDto);
    post.accountId = req.user.sub;
    await this.postRepo.insert(post);
  }

  async update(post: Post) {
    await this.postRepo.update(post.id, post);
  }
}
