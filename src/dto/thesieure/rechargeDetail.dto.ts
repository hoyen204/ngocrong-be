export class RechargeDetailDto {
  trans_id: number;
  request_id: string;
  value: number | null;
  amount: number;
  declared_value: number;
  telco: string;
  serial: string;
  code: string;
  status: number;
  message: string;
}
