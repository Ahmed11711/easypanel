import { Wallet } from 'src/modules/wallte/entity/wallet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';

@Entity('devolpers')
export class Devolper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  desc: string;

  @Column()
  img: string;

  @Column()
  websiteUrl: string;

  @Column()
  status: boolean;

  @OneToMany(() => Wallet, (wallte) => wallte.devolper)
  wallte: Wallet[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn() 
  deleted_at: Date;
}
 
