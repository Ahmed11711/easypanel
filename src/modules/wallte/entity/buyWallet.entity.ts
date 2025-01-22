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
import { ContractEntity } from 'src/modules/contract/entity/contract.entity';
import { ProfitWallte } from './profitWallte.entity';

@Entity('buffer_users')
export class BuyWallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  buffer_id: number;

  @Column()
  start_subscrip: Date;

  @Column()
  end_subscrip: Date;

  @Column()
  num_unite: number;

  @Column()
  profit: number;

  @Column()
  amount: number;

  @Column()
  active: Boolean;

  @Column()
  peryears: number;
  @Column({
    type: 'enum',
    enum: TypeWallte,
   })
  type: TypeWallte;
 

  @Column()
  HashID: string;   


  
  

  @Column({ type: 'date', nullable: true })
  finsh_quarter: Date;

 

  @ManyToOne(() => Wallet, (wallte) => wallte.buyWallte)
  @JoinColumn({ name: 'buffer_id' })
  wallte: Wallet;


  @OneToMany(() => ProfitWallte, (profitWallte) => profitWallte.profitWallet)
  @JoinColumn({ name: 'buffer_id' })
  myProfit: ProfitWallte;


    
@OneToOne(() => ContractEntity, (contract) => contract.buyWallet)
contracts: ContractEntity;

  // for devolper

 
 

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

//   @DeleteDateColumn({ type: 'timestamp', nullable: true })
//   deleted_at: Date;
}
