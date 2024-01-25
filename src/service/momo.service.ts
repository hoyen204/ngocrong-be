import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TheSieuReService } from '.';
import { Momo } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MomoService {
  constructor(
    @InjectRepository(Momo)
    private readonly momoRepo: Repository<Momo>,
    private httpService: HttpService,
    private configService: ConfigService,
    private theSieuReService: TheSieuReService,
  ) {}

  async getByPhone(phone: string): Promise<Momo> {
    return await this.momoRepo.findOneBy({
      phone,
    });
  }

  async update(momo: Momo) {
    await this.momoRepo.update(momo.id, momo);
  }
}
