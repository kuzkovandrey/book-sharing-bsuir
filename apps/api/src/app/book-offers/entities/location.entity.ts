import { LocationRegion } from '@book-sharing/api-interfaces';
import { Entity, Column } from 'typeorm';
import { BaseEntity, TableNames } from '@core';

@Entity({ name: TableNames.LOCATIONS })
export class LocationEntity extends BaseEntity {
  @Column({
    nullable: false,
    type: 'enum',
    enum: LocationRegion,
    default: LocationRegion.MINSK_REGION,
  })
  region: LocationRegion;

  @Column({ nullable: false, type: 'varchar' })
  city: string;
}
