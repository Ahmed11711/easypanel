import { Devolper } from 'src/modules/devolper/entity/devolper.entity';
import { Project } from 'src/modules/projects/entity/projects.entity';
import { TypeWallte } from 'src/modules/withdraw/enum/typeWallte.enum';
import {SizeWalltes} from '../enum/SizeWallte.enum'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { Wallet } from './wallet.entity';
import { BuyWallet } from './buyWallet.entity';

@Entity('profit_buffer_to_users')
export class ProfitWallte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  buffer_id: number;
  
  @Column()
  buffer_users_id: number;
  

  @Column()
  newperiod: Date;

  @Column({ type: 'float' })
  profit: number;

 
 
  @Column()
  active: Boolean;

  @Column()
  HashID: string;
 
  @ManyToOne(() => BuyWallet, (wallte) => wallte.myProfit)
  @JoinColumn({ name: 'buffer_users_id' })
  profitWallet: BuyWallet;


  // @ManyToOne(() => Wallte, (wallte) => wallte.profitWallet)
  // @JoinColumn({ name: 'buffer_id' })
  // wallte: BuyWallet;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;


}
