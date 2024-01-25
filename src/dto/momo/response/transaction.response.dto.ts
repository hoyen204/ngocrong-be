export class MomoTransactionHistory {
  time: number;
  statusCode: number;
  resultCode: number;
  message: string;
  momoMsg: MomoTransactionDetail[] | MomoTransactionDetail;
  currentLimit: number;
  listOver: boolean;
}

export class MomoTransactionDetail {
  transId: number;
  serviceId: string;
  lastUpdate: number;
  status: number;
  totalOriginalAmount: number;
  totalAmount: number;
  sourceId: string;
  sourceName: string;
  targetId: string;
  targetName: string;
  io: number;
  serviceName: string;
  createdAt: number;
  oldData: any;
  serviceData: string;
  isDeleted: boolean;
  isHandled: boolean;
}
