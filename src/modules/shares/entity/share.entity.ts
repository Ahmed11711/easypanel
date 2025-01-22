import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { TypeStatusShare } from '../enum/share.enum';
import { ShareUser } from './shareUser.entity';

@Entity('shares') // Matches the table name in the database
export class Share {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column() 
  availableShare: number;

  @Column() 
  period: number;

  @Column() 
  price: number;

  @Column() 
  profit: number;

  @Column() 
  sold: number;
  @Column() 
  dividendDistributed: number;

  @Column({ type: 'date' }) 
  expireDate: Date;

  @Column({type:'enum',enum:TypeStatusShare}) 
  status: TypeStatusShare;


  @OneToOne(() => ShareUser, (shareUser) =>  shareUser.share)
  shareUser: ShareUser;

  @CreateDateColumn()  
  created_at: Date;

  @UpdateDateColumn()  
  updated_at: Date;
}
