import { CommentEntity } from './../../book-offers/entities/comment.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Exclude } from '@nestjs/class-transformer';
import { BaseEntity, TableNames } from '@core';
import { TelephoneEntity } from './telephone.entity';

@Entity({ name: TableNames.USERS })
export class UserEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar', unique: true })
  username: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  @Exclude()
  refreshToken?: string;

  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    onDelete: 'SET NULL',
  })
  comments: CommentEntity[];

  @OneToMany(() => TelephoneEntity, (tel) => tel.user, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  telephones: TelephoneEntity[];
}
