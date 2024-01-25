import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async getById(id: number, getRelations: boolean = false): Promise<Account> {
    return await this.accountRepo.findOne({
      where: {
        id,
      },
      relations: {
        player: getRelations,
        recharges: getRelations,
        posts: getRelations,
      },
    });
  }

  async findByUsername(username: string): Promise<Account> {
    return await this.accountRepo.findOne({
      where: {
        username,
      },
    });
  }

  async create(account: Account) {
    await this.accountRepo.insert(account);
  }

  async update(account: Account) {
    await this.accountRepo.update(account.id, account);
  }

  async updateCoin(account: Account) {
    await this.accountRepo.update(account.id, {
      coin: account.coin,
    });
  }
}
