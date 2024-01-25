import { MomoMsg } from 'src/dto/momo';

export interface CheckUserBeMsgRequest {
  user: string;
  msgType: string;
  momoMsg: MomoMsg;
  appVer: number;
  appCode: string;
  lang: string;
  deviceOS: string;
  channel: string;
  buildNumber: number;
  appId: string;
  cmdId: string;
  time: number;
}
