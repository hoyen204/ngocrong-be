import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { AccountDto } from 'src/dto';
import { Comment } from 'src/entities';

@Exclude()
export class CommentDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  created: Date;

  @ApiProperty()
  @Expose()
  account: AccountDto;
}
