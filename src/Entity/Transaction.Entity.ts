import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Exclude } from 'class-transformer';
import { Wallet } from "./wallet.entity";

export enum TRANSFERSTATUS  {
    SUCCESS= "SUCCESS",
    COMPLETED= "COMPLETED",
    FAILED= "FAILED",
    REVERSED= "REVERSED",
  };

export enum BookFormat {
    HARDCOVER = 'hardcover',
    PAPERBACK = 'paperback',
    DIGITAL = 'digital'
  }

@Entity()
export class Transaction extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    Amount: number;

    @Column()
    Purpose: string

    @Column()
    Type: string

    @Column({
        type: 'enum',
        enum: TRANSFERSTATUS,
        default: TRANSFERSTATUS.SUCCESS
      })
      status: TRANSFERSTATUS
    
}