import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity, TableNames } from '@core';
import { BookOfferEntity } from 'src/app/book-offers/entities';
import { ExchangeStatus } from '@book-sharing/api-interfaces';

@Entity({ name: TableNames.EXCHANGES })
export class ExchangeEntity extends BaseEntity {
  @OneToOne(() => BookOfferEntity)
  @JoinColumn()
  from: BookOfferEntity;

  @OneToOne(() => BookOfferEntity)
  @JoinColumn()
  to: BookOfferEntity;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ExchangeStatus,
    default: ExchangeStatus.PENDING,
  })
  status: ExchangeStatus;
}
