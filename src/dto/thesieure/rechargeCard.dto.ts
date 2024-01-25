import { IsNumberString, IsString } from 'class-validator';

export class RechargeCardDto {
  @IsString()
  telco: string;

  amount: string;

  @IsNumberString()
  code: string;

  @IsString()
  serial: string;
}
