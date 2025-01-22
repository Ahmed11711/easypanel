import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,OneToOne, OneToMany } from 'typeorm';
import {Share} from './share.entity'
import { ProfitShare } from './profitShare.entity';
 
@Entity('share_users')
export class ShareUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  share_id: number;

  @Column({ type: 'date' })
  start_subscrip: Date;

  @Column({ type: 'date', nullable: true })
  end_subscrip: Date;

  @Column({ type: 'int' })
  num_unite: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToOne(() => Share, (share) =>  share.shareUser)
  @JoinColumn({ name: 'share_id' }) // Specifies that "share_id" is the foreign key
  share: Share;
   

  @OneToMany(() => ProfitShare, (profitShare) =>  profitShare.profitShare)
  @JoinColumn({ name: 'share_users_id' })  
  profitShare: ProfitShare;
 

  @Column({ type: 'int' })
  profit: number;


  @Column()
  amount: number;

  @Column()
  HashID: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // Define relationships if necessary
 

 
}
