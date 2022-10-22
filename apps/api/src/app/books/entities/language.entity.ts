import { Entity, Column } from 'typeorm';

import { TableNames, BaseEntity } from '@core';

@Entity({ name: TableNames.LANGUAGES })
export class LanguageEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;
}