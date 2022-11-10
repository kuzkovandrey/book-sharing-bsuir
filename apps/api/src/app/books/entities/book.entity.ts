import {
  Entity,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { TableNames, BaseEntity } from '@core';
import { LanguageEntity } from './language.entity';
import { GenreEntity } from './genre.entity';
import { PublisherEntity } from './publisher.entity';
import { AuthorEntity } from './author.entity';
import { PictureEntity } from './picture.entity';

@Entity({ name: TableNames.BOOKS })
export class BookEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar', name: 'book_title' })
  title: string;

  @Column({
    nullable: false,
    length: 500,
    type: 'varchar',
    name: 'book_description',
  })
  description: string;

  @Column({ nullable: false, type: 'int', name: 'book_page_count' })
  pageCount: number;

  @Column({ nullable: false, type: 'int', name: 'book_publication_year' })
  publicationYear: number;

  @ManyToOne(() => LanguageEntity)
  language: LanguageEntity;

  @ManyToOne(() => GenreEntity)
  genre: GenreEntity;

  @ManyToOne(() => PublisherEntity)
  publisher: PublisherEntity;

  @OneToMany(() => PictureEntity, (picture) => picture.book)
  pictures: PictureEntity[];

  @ManyToMany(() => AuthorEntity, (author) => author.books)
  @JoinTable()
  authors: AuthorEntity[];
}
