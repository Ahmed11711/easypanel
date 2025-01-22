import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('blogs')  
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()  
  title: string;

  @Column()  
  desc: string;

  @Column()  
  img: string;

 

  @CreateDateColumn() 
  created_at: Date;

  @UpdateDateColumn()  
  updated_at: Date;
}
