import { Entity, Column } from 'typeorm';

import { TableNames, BaseEntity } from '@core';

@Entity({ name: TableNames.GENRES })
export class GenreEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;
}