import {DataSource } from 'typeorm';
import dotenv from "dotenv";

dotenv.config();


import { User } from './src/Entity/user.entity';
import { Wallet } from './src/Entity/wallet.entity';
import { Transaction } from './src/Entity/Transaction.Entity';
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432, //3306,
    username: "postgres",
    password: "Akinwunmipg",
    database: "TDBank",
    synchronize: true,
    logging: true,
    entities: [User, Wallet, Transaction], //["src/app/entities/**/*.ts"],
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: ["src/app/subscribers/**/*.ts"],
})