import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeviceStatus } from '../enum/deviceStatus.enum';
import { MangerStatus } from '../enum/mangerAccount.enum';

@Entity('users_alloweds')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip_device: string;

  @Column()
  device_name: string;

  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.ACTIVE,
  })
  active: DeviceStatus;

  @Column()
  transaction_id: string;

  @Column()
  location: string;

  @Column()
  user_id: number;

  @Column({
    type: 'enum',
    enum: MangerStatus,
    default: MangerStatus,
  })
  MangerStatus: MangerStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
