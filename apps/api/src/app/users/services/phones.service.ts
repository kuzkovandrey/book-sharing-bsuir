import { TelephoneEntity } from './../entities/telephone.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TelephonesService {
  constructor(
    @InjectRepository(TelephoneEntity)
    private readonly telephonesRepository: Repository<TelephoneEntity>
  ) {}

  async createIfNotExists(telephoneNumber: string): Promise<TelephoneEntity> {
    const telephone = await this.telephonesRepository.findOneBy({
      telephoneNumber,
    });

    if (telephone) return;

    return await this.telephonesRepository.create({ telephoneNumber }).save();
  }

  async createManyIfNotExists(
    telNumbers: string[]
  ): Promise<TelephoneEntity[]> {
    const queue = telNumbers.map((tel) => this.createIfNotExists(tel));

    return await Promise.all(queue);
  }
}
