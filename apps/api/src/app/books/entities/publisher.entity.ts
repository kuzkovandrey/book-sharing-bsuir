import { BookEntity } from './book.entity';
import { Entity, Column, OneToMany } from 'typeorm';

import { TableNames, BaseEntity } from '@core';

@Entity({ name: TableNames.PUBLISHERS })
export class PublisherEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  // CHANGES FOR HEROKU
  @OneToMany(() => BookEntity, (book) => book.publisher, {
    onDelete: 'SET NULL',
  })
  books: BookEntity[];
}
