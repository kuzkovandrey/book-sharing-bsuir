import { Entity, Column, ManyToMany } from 'typeorm';

import { BaseEntity, TableNames } from '@core';
import { BookEntity } from './book.entity';

@Entity({ name: TableNames.AUTHORS })
export class AuthorEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar', name: 'author_first_name' })
  firstName: string;

  @Column({ nullable: false, type: 'varchar', name: 'author_last_name' })
  lastName: string;

  @ManyToMany(() => BookEntity, (book) => book.authors)
  books: BookEntity[];
}
