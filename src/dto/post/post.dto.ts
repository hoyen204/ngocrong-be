import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { AccountDto } from 'src/dto';
import { Post } from 'src/entities';
import { CommentDto } from './comment.dto';

@Exclude()
export class PostDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  @IsEnum(Post)
  status: 'WAITING_FOR_APPROVAL' | 'APPROVED' | 'PROCESSED' | 'LOCKED';

  @ApiProperty()
  @Expose()
  @IsEnum(Post)
  state: 'NONE' | 'HOT' | 'NEW';

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  account: AccountDto;

  @ApiProperty()
  @Expose()
  comments: CommentDto[];
}
