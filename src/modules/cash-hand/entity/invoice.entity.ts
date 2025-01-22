 import { User } from 'src/modules/user/entity/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
@Entity('cach_uploads')

export class InvoiceEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    amount: number;

    @Column()
    status:boolean;

    @Column()
    img:string;

    @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.invoice, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}