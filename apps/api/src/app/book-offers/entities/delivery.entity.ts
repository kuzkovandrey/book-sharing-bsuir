import { DeliveryTypes } from '@book-sharing/api-interfaces';
import { Entity, Column, ManyToMany } from 'typeorm';

import { BaseEntity, TableNames } from '@core';

@Entity({ name: TableNames.DELIVEIES })
export class DeliveryEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: DeliveryTypes,
    default: DeliveryTypes.COME_YOURSELF,
  })
  type: DeliveryTypes;
}
