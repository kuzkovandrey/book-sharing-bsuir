import { BookEntity } from '../../books';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { BaseEntity, TableNames } from '@core';
import { UserEntity } from '@users/entities';
import {
  BookOfferStatus,
  DeliveryTypes,
  OfferType,
} from '@book-sharing/api-interfaces';
import { CommentEntity } from './comment.entity';
import { LocationEntity } from './location.entity';

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

  @Column({
    nullable: false,
    type: 'enum',
    enum: DeliveryTypes,
    default: DeliveryTypes.COME_YOURSELF,
  })
  deliveryType: DeliveryTypes;

  @Column({
    nullable: false,
    type: 'enum',
    enum: BookOfferStatus,
    default: BookOfferStatus.ACTIVE,
  })
  offerStatus: BookOfferStatus;

  @Column({
    nullable: false,
    type: 'enum',
    enum: OfferType,
    default: OfferType.FREE,
  })
  offerType: OfferType;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.bookOffer, {
    onDelete: 'SET NULL',
  })
  comments: CommentEntity[];

  //
  @ManyToOne(() => LocationEntity, {
    onDelete: 'SET NULL',
  })
  location: LocationEntity;
}
