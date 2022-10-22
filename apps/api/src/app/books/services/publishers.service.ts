import { PublisherEntity } from './../entities/publisher.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(PublisherEntity)
    private readonly publishersRepository: Repository<PublisherEntity>
  ) {}

  async createIfNotExists(name: string): Promise<PublisherEntity> {
    const publisher = await this.publishersRepository.findOneBy({ name });

    if (publisher) return publisher;

    return await this.publishersRepository.create({ name }).save();
  }
}
