import { LanguageEntity } from './../entities/language.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languagesRepository: Repository<LanguageEntity>
  ) {}

  async createIfNotExists(name: string): Promise<LanguageEntity> {
    const lang = await this.languagesRepository.findOneBy({ name });

    if (lang) return lang;

    return await this.languagesRepository.create({ name }).save();
  }
}
