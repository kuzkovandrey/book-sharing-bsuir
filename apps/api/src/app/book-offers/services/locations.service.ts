import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Location } from '@book-sharing/api-interfaces';
import { LocationEntity } from '../entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationsRepository: Repository<LocationEntity>
  ) {}

  async createIfNotExists({ region, city }: Location) {
    try {
      return await this.locationsRepository.findOneByOrFail({ region, city });
    } catch {
      return await this.locationsRepository.create({ region, city }).save();
    }
  }
}
