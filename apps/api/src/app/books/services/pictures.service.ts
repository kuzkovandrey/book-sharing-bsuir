import { Picture } from '@book-sharing/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PictureEntity } from '../entities';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(PictureEntity)
    private readonly picturesRepository: Repository<PictureEntity>
  ) {}

  async create(url: string): Promise<PictureEntity> {
    return await this.picturesRepository.create({ url }).save();
  }

  async createMany(urls: string[]): Promise<PictureEntity[]> {
    const promiseQueue = urls.map((url) => this.create(url));

    return await Promise.all(promiseQueue);
  }
}
