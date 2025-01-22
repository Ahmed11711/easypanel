import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('price_shares')
export class PriceShare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double', precision: 8, scale: 2 })
  price: number;

  @Column({ type: 'text' })
  desc: string;

  @Column({ type: 'datetime', nullable: true })
  expire_date: Date;


  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
