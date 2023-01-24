import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Message extends BaseEntity{
   @PrimaryGeneratedColumn('uuid')
   id: string; 

   @Column()
   message: string;

   @Column()
   sender: string

   @Column()
   receiver: string
   
   @Column()
   status: string

   
   @Column()
   type: string
}

