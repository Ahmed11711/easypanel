import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_walltes')
export class UserWallte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  privateKey: string;

  @Column()
  publicKey: string;

  @Column()
  address: string;

  @Column()
  phrase: string;

  @Column()
  password: string;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
