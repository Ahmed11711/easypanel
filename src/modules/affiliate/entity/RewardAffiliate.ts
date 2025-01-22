import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('profit_wallets')  
export class RewardAffiliate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gen: number;

  @Column()
  target: number;

  @Column()
  reward: number;

  @Column()
  salary: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
