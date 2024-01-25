import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

@Exclude()
export class PlayerDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNumber()
  gender: number;

  @Expose()
  @IsString()
  dataPoint: string;

  @Expose()
  @IsDate()
  createTime: Date;

  @Expose()
  @IsNumber()
  violate: number;
}
