import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RechargeDto {
  @Expose()
  @IsNumber()
  declaredValue: number;

  @Expose()
  @IsString()
  telco: string;

  @Expose()
  @IsNumber()
  status: number;

  @Expose()
  @IsString()
  message: string;
}
