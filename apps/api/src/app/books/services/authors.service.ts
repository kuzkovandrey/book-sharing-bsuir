import { Author } from '@book-sharing/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from '../entities';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>
  ) {}

  async createIfNotExists({
    firstName,
    lastName,
  }: Author): Promise<AuthorEntity> {
    // const author = await this.authorRepository.findOneBy({
    //   firstName,
    //   lastName,
    // });

    // if (author) return author;

    try {
      return await this.authorRepository.findOneByOrFail({
        firstName,
        lastName,
      });
    } catch {
      return await this.authorRepository.create({ firstName, lastName }).save();
    }
  }

  async createMany(authors: Author[]): Promise<AuthorEntity[]> {
    const promiseQueue = authors.map((author) =>
      this.createIfNotExists(author)
    );

    return await Promise.all(promiseQueue);
  }
}
