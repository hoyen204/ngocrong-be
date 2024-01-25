import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MomoTransaction } from 'src/entities';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class MomoTransactionService {
  constructor(
    @InjectRepository(MomoTransaction)
    private readonly momoTransactionRepository: Repository<MomoTransaction>,
  ) {}

  async find(
    options?: FindManyOptions<MomoTransaction>,
  ): Promise<MomoTransaction[]> {
    return await this.momoTransactionRepository.find(options);
  }

  async findAll(): Promise<MomoTransaction[]> {
    return await this.momoTransactionRepository.find();
  }

  async findOne(id: number): Promise<MomoTransaction> {
    return await this.momoTransactionRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByTransId(transId: number): Promise<MomoTransaction> {
    return await this.momoTransactionRepository.findOne({
      where: {
        transId,
      },
    });
  }

  async findUnhandled(): Promise<MomoTransaction[]> {
    return await this.momoTransactionRepository.find({
      where: {
        io: 1,
        isHandled: false,
      },
    });
  }

  async create(momoTransaction: MomoTransaction): Promise<MomoTransaction> {
    return await this.momoTransactionRepository.save(momoTransaction);
  }

  async update(momoTransaction: MomoTransaction) {
    await this.momoTransactionRepository.update(
      momoTransaction.id,
      momoTransaction,
    );
  }

  async remove(id: number): Promise<void> {
    await this.momoTransactionRepository.delete(id);
  }
}
