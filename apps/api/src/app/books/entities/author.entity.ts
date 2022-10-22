import { Entity, Column, ManyToMany } from 'typeorm';

import { BaseEntity, TableNames } from '@core';
import { BookEntity } from './book.entity';

@Entity({ name: TableNames.AUTHORS })
export class AuthorEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  firstName: string;

  @Column({ nullable: false, type: 'varchar' })
  lastName: string;

  @ManyToMany(() => BookEntity, (book) => book.authors)
  books: BookEntity[];
}