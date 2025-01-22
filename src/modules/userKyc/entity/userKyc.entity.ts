 import { User, } from 'src/modules/user/entity/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { typeStatusKyc } from '../enum/user-kyc.enum';

@Entity('user_kyc')
export class UserKyc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  international_id: string;

  @Column()
  front_id_image: string;

  @Column({ nullable: true })
  back_id_image: string;

  @Column()
  face_image: string;

  @Column()
  active: typeStatusKyc;

  @OneToOne(() => User, (user) => user.userKyc, { nullable: false })
  @JoinColumn({ name: 'user_id' })  
  user: User;

  
  @Column()
  user_id:number
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
