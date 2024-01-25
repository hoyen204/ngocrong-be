import { Extra } from 'src/dto/momo';
import { MomoMsg } from 'src/dto/momo';

export interface CheckUserBeMsgResponse {
  momoMsg: MomoMsg;
  time: number;
  user: string;
  cmdId: string;
  lang: string;
  msgType: string;
  result: boolean;
  errorCode: number;
  errorDesc?: string;
  appCode: string;
  appVer: number;
  channel: string;
  deviceOS: string;
  session: string;
  extra: Extra;
  resultType: string;
  path: string;
}
