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
import { BuyWallet } from './buyWallet.entity';

@Entity('buffers')
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int', default: 0 })
  number_of_unit: number;

  @Column({ type: 'varchar' })
  price_unit: string;

  @Column({ type: 'int', default: 0 })
  sold: number;

  @Column()
  percentage: number;

  @Column()
  peryears: number;

  @Column({
    type: 'enum',
    enum: SizeWalltes,
   }) 
   
   sizeWalltes: SizeWalltes;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({
    type: 'enum',
    enum: TypeWallte,
   })
  type: TypeWallte;

  @Column({ type: 'int', nullable: false })
  country_id: number;

  // @Column({ type: 'int', nullable: false })
  // project_wallte_id: number;

  @Column({ type: 'date', nullable: true })
  expire_date: Date;

  @Column({ type: 'varchar', length: 50, nullable: false })
  statusApp: string;

  @Column()
  profitDistributed:number

  @OneToOne(() => Project, (project) => project.asiangmanet)
  @JoinColumn({ name: 'project_wallte_id' })
  project: Project;


  
  @OneToMany(() => BuyWallet, (buyWallte) => buyWallte.wallte)
  @JoinColumn({ name: 'buffer_id' })
  buyWallte: BuyWallet;

  // for devolper test

  @Column()
  asiangmanet: number;

  @ManyToOne(() => Devolper, (devolper) => devolper.wallte)
  @JoinColumn({ name: 'asiangmanet' })
  devolper: Devolper;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
