import { Entity, Column } from 'typeorm';
import { Exclude } from '@nestjs/class-transformer';
import { BaseEntity, TableNames } from '@core';

@Entity({ name: TableNames.USERS })
export class UserEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  username: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  @Exclude()
  refreshToken?: string;
}
