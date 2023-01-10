import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Exclude } from 'class-transformer';
import { Wallet } from "./wallet.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    firstname!: string 

    @Column()
    lastname!: string 

    @Column()
    password!: string;

    @Column()
    phoneNumber!: string

    @Column()
    accessToken!: string

    @Column({ unique: true })
    username!: string;

    @OneToOne((_type) => Wallet, (wallet) => wallet.Balance, { eager: false })
    @Exclude({ toPlainOnly: true })
    balance!: Wallet;

}