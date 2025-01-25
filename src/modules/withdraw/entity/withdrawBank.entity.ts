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
import { TypeWithdrawEnum } from '../enum/typeWithdraw.enum';

@Entity('withdraw_by_banks')
export class WithdrawByBank {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    bankName: string;
  
    @Column()
    bankAccountName: string;
  
    @Column()
    ibanBank: string;
  
    @Column()  
    amount: number;

    @Column({
        type: 'enum', 
        enum: TypeWithdrawEnum,  
       })
      status: TypeWithdrawEnum;

      @Column()  
      user_id:number
      
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
