import { DeliveryEntity } from './delivery.entity';
import { BookEntity } from '../../books';
import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity, TableNames } from '@core';
import { UserEntity } from '@users/entities';

@Entity({ name: TableNames.BOOK_OFFERS })
export class BookOfferEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  info: string;

  @Column({ nullable: false, type: 'boolean', default: true })
  isActive: boolean;

  @OneToOne(() => BookEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  book: BookEntity;

  @ManyToOne(() => DeliveryEntity)
  delivery: DeliveryEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
