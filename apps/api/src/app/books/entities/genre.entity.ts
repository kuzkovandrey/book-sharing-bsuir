import { BookEntity } from './book.entity';
import { Entity, Column, OneToMany } from 'typeorm';

import { TableNames, BaseEntity } from '@core';

@Entity({ name: TableNames.GENRES })
export class GenreEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  // CHANGES FOR HEROKU
  @OneToMany(() => BookEntity, (book) => book.genre, {
    onDelete: 'SET NULL',
  })
  books: BookEntity[];
}
