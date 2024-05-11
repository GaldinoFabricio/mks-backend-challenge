import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   nickname: string;

   @Column()
   email: string;

   @Column()
   password: string;
}
