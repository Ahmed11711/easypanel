import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeOtp } from '../enum/typeOtp.snum';

@Entity('otps')
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  otp: string;

  @Column()
  is_used: boolean;

  @Column()
  expires_at: Date;

  @Column()
  user_id: number;

  @Column({ type: 'enum', enum: TypeOtp })
  type: TypeOtp;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
