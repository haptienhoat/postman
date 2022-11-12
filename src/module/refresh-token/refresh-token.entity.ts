import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh-token')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'userId', nullable: false })
  userId: string;

  @Column('text', { name: 'refreshToken', nullable: false })
  refreshToken: string;

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