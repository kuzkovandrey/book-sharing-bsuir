import { BookEntity } from './book.entity';
import { Entity, Column, OneToMany } from 'typeorm';

import { TableNames, BaseEntity } from '@core';

@Entity({ name: TableNames.LANGUAGES })
export class LanguageEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  // CHANGES FOR HEROKU
  @OneToMany(() => BookEntity, (book) => book.language, {
    onDelete: 'SET NULL',
  })
  books: BookEntity[];
}
