import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';
import { PlayerDto, PostDto, RechargeDto } from 'src/dto';

@Exclude()
export class AccountDto {
  @Expose()
  @IsString()
  username: string;

  @Expose()
  @IsNumber()
  ban: number;

  @Expose()
  @IsNumber()
  role: number;

  @Expose()
  @IsNumber()
  isAdmin: number;
  @Expose()
  @IsString()
  ipAddress: string;

  @Expose()
  @IsNumber()
  active: number;
  @Expose()
  @IsNumber()
  coin: number;

  @Expose()
  @IsNumber()
  vnd: number;

  @IsObject()
  player: PlayerDto;

  @IsArray()
  recharges: RechargeDto[];

  @IsArray()
  posts: PostDto[];
}
