import { Devolper } from 'src/modules/devolper/entity/devolper.entity';
import { Project } from 'src/modules/projects/entity/projects.entity';
 
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
import {ShareUser} from './shareUser.entity'
 

@Entity('profit_share_to_user')
export class ProfitShare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  share_users_id: number;

  @Column()
  newperiod: Date;

  @Column({ type: 'float' })
  profit: number;

 
 
  @Column()
  active: Boolean;

  @Column()
  HashID: string;
 
  @ManyToOne(() => ShareUser, (shareUser) => shareUser.profitShare)
  @JoinColumn({ name: 'share_users_id' })
  profitShare: ShareUser;


  // @ManyToOne(() => Wallte, (wallte) => wallte.profitWallet)
  // @JoinColumn({ name: 'buffer_id' })
  // wallte: BuyWallet;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;


}
