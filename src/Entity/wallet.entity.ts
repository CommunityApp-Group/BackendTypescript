import { Exclude } from "class-transformer";
import {BaseEntity, Column, Entity,  OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Wallet extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({default: 0})
    Balance!: number

    @OneToOne((_type) => User, (user) => user.id, { eager: true })
    @Exclude({ toPlainOnly: true })
    user!: User;
}