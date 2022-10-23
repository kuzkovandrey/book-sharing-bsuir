import { BookOfferEntity } from './book-offer.entity';
import { BookEntity } from '../../books';
import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity, TableNames } from '@core';
import { UserEntity } from '@users/entities';
import { DeliveryTypes, OfferType } from '@book-sharing/api-interfaces';

@Entity({ name: TableNames.COMMENTS })
export class CommentEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  text: string;

  @ManyToOne(() => BookOfferEntity, (offer) => offer.comments)
  bookOffer: BookOfferEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;
}
