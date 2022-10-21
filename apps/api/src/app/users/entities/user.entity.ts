import { Entity, Column } from 'typeorm';
import { BaseEntity, TableNames } from '@core';

@Entity({ name: TableNames.USERS })
export class UserEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;
}
