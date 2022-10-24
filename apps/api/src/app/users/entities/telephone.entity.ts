import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity, TableNames } from '@core';
import { UserEntity } from './user.entity';

@Entity({ name: TableNames.TELEPHONES })
export class TelephoneEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  telephoneNumber: string;

  @ManyToOne(() => UserEntity, (user) => user.telephones)
  user: UserEntity;
}
