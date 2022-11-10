import { Entity, Column } from 'typeorm';

import { BaseEntity, TableNames } from '@core';

@Entity({ name: TableNames.PICTURES })
export class PictureEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  url: string;
}
