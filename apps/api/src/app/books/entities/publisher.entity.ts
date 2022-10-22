import { Entity, Column } from 'typeorm';

import { TableNames, BaseEntity } from '@core';

@Entity({ name: TableNames.PUBLISHERS })
export class PublisherEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;
}