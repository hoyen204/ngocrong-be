import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recharge } from 'src/entities';
import { FindManyOptions, In, Not, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class RechargeService {
  constructor(
    @InjectRepository(Recharge)
    private readonly rechargeRepo: Repository<Recharge>,
  ) {}

  async findMomoPending(): Promise<Recharge[]> {
    return await this.rechargeRepo.find({
      where: {
        status: 99,
        telco: 'MOMO',
      },
    });
  }

  async findMomo(accountId: number): Promise<Recharge> {
    return await this.rechargeRepo.findOne({
      where: {
        accountId,
        status: 99,
        telco: 'MOMO',
      },
    });
  }

  async getBySign(sign: string) {
    return await this.rechargeRepo.findOne({
      where: {
        sign,
      },
    });
  }

  async create(recharge: QueryDeepPartialEntity<Recharge>) {
    return await this.rechargeRepo.insert(recharge);
  }

  async update(recharge: Recharge) {
    return await this.rechargeRepo.update(recharge.id, recharge);
  }
}
