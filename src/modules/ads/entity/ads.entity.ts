import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdType } from '../enum/ads.eum';

@Entity('ads')
export class Ads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  img: string;

  @Column()
  status: boolean;

  @Column({ type: 'enum', enum: AdType })
  type: AdType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
