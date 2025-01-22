import { Wallet } from 'src/modules/wallte/entity/wallet.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';

@Entity('project_walttes')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  img: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ type: 'json', nullable: true })
  filenames: string[];

  @Column()
  address: string;

  @Column()
  contractPdf: string;

  @OneToOne(() => Wallet, (asiangmanet) => asiangmanet.project)
  asiangmanet: Wallet;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
