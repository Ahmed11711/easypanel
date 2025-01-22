import { User } from 'src/modules/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('markting_fesses')  
export class MarketingFees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.marketingFees)
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @Column()
  upline_id: number;

  @Column() 
  amount: number;

  @Column()
  buffer_id: number;

  @Column()
  generations: number;

  @Column()
  num_unit: number;

  @Column() 
  profit_users: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
