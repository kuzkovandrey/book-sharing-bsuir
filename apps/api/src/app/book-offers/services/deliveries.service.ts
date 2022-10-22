import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryTypes } from '@book-sharing/api-interfaces';
import { DeliveryEntity } from '../entities';

@Injectable()
export class DeliveriesInitService {
  private isInitTypes = false;

  constructor(
    @InjectRepository(DeliveryEntity)
    private readonly deliveriesRepository: Repository<DeliveryEntity>
  ) {}

  private async createIfNotExists(
    type: DeliveryTypes
  ): Promise<DeliveryEntity> {
    const delivery = await this.deliveriesRepository.findOneBy({ type });

    if (delivery) return delivery;

    return this.deliveriesRepository.create({ type }).save();
  }

  private isInit(): boolean {
    return this.isInitTypes;
  }

  private async initDefaultTypes() {
    const types = Object.values(DeliveryTypes);
    const count = types.length;

    const deliveries = await this.deliveriesRepository.find({
      where: [...types.map((type) => ({ type }))],
    });

    if (deliveries.length === count) return;

    const promiseQueue = types.map((type) => this.createIfNotExists(type));

    await Promise.all(promiseQueue);

    this.isInitTypes = true;
  }

  async findByType(type: DeliveryTypes) {
    if (!this.isInit()) await this.initDefaultTypes();

    return this.deliveriesRepository.findOneByOrFail({ type });
  }
}
