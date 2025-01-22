import { User } from 'src/modules/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeWithdraw } from '../enum/withdraw.enum';

@Entity('transfer_manies')
export class Withdraw {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  Visa_number: string;

  @Column()
  transaction_id: string;
  @Column({ type: 'enum', enum: TypeWithdraw })
  status: TypeWithdraw;
 

  @OneToMany(() => User, (user) => user.withdraw, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
