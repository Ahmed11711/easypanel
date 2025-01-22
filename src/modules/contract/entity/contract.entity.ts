import { BuyWallet } from 'src/modules/wallte/entity/buyWallet.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('contract_users_datas')
  export class ContractEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_id: number;

    @Column()
    buffer_user_id: number;
  
    @Column()
    contract: string;

  
  
    @Column()
    HashID: string;   
  
  
    @ManyToOne(() => BuyWallet, (buyWallte) => buyWallte.contracts)
    @JoinColumn({ name: 'buffer_user_id' })  
    buyWallet: BuyWallet;
    

    @Column()
    status: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
 
  }
  