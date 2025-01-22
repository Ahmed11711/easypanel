import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { StatusUser } from '../enum/status.enum';
import { UserKyc } from 'src/modules/userKyc/entity/userKyc.entity';
import { Deposite } from 'src/modules/deposite/entity/deposite.entity';
import { Notfication } from 'src/modules/notfication/entity/notifcation.entity';
import { PinCodeEntity } from 'src/modules/pin-code/entity/pinCode.entity';
import { Withdraw } from 'src/modules/withdraw/entity/withdraw.entinty';
import { InvoiceEntity } from 'src/modules/cash-hand/entity/invoice.entity';
import { MarketingFees } from 'src/modules/affiliate/entity/affilite.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: null, nullable: true })
  affiliate_code: string;

  @Column({ default: null, nullable: true })
  comming_afflite: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  verified: number;

  @Column()
  email_verified_at: Date;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  remember_token: string;

  @Column()
  phone: string;

  @Column({ type: 'enum', enum: StatusUser })
  status: StatusUser;

  @Column({ type: 'text', nullable: true })
  fcm_token: string;

  @Column({ type: 'double', nullable: false })
  number_points: number;

  @Column({})
  money: number;

  @Column()
  otp: string;
 

  @Column()
  number_of_user: number;

  @Column({  nullable: false })
  img:string

  @OneToOne(() => UserKyc, (userKyc) => userKyc.user, { cascade: true })
  userKyc: UserKyc;

  @OneToOne(() => PinCodeEntity, (pincode) => pincode.user, { cascade: true })
  pinCode: PinCodeEntity;

  @OneToMany(() => Deposite, (deposite) => deposite.user, { cascade: true })
  deposite: Deposite;

  @OneToMany(() => Withdraw, (withdraw) => withdraw.user, { cascade: true })
  withdraw: Withdraw;

  @OneToMany(() => Notfication, (notfication) => notfication.user)
  notfications: Notfication[];

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.user)
  invoice: InvoiceEntity[];

  @OneToMany(() => MarketingFees, (marketingFees) => marketingFees.user)
  marketingFees: MarketingFees[];


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
