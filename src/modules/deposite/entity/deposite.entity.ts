import { User } from 'src/modules/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeDeposite } from '../enum/type-deposite.enum';

@Entity('deposits_binances')
export class Deposite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  textId: string;

  @Column()
  network: string;
  @Column()
  status: boolean;

  @Column()
  from: string;

  @Column()
  to: string;
  @OneToMany(() => User, (user) => user.deposite, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @Column()
  user_id: number;
  @Column({
    type: 'enum',
    enum: TypeDeposite,
   
  })
  type: TypeDeposite;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
