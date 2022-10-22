import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreEntity } from '../entities';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genresRepository: Repository<GenreEntity>
  ) {}

  async createIfNotExists(name: string): Promise<GenreEntity> {
    const genre = await this.genresRepository.findOneBy({ name });

    if (genre) return genre;

    return await this.genresRepository.create({ name }).save();
  }
}
