import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity, TableNames } from '@core';
import { BookEntity } from './book.entity';

@Entity({ name: TableNames.PICTURES })
export class PictureEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  url: string;

  @ManyToOne(() => BookEntity, (book) => book.pictures)
  book: BookEntity;
}
