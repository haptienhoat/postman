import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../role/role.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name', nullable: false })
  name: string;

  @Column('int', { name: 'quantity', nullable: false })
  quantity: number;

  @Column('int', { name: 'price', nullable: false })
  price: number;

  @Column('varchar', { name: 'userId', nullable: false })
  userId: string;

  @Column('timestamp', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}