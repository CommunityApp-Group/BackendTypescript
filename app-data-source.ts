import {DataSource } from 'typeorm';
import dotenv from "dotenv";

dotenv.config();
let { DB_PASSWORD,DB_USERNAME,  DB_HOST, DB_DATABASE } = process.env;
// DB_PASSWORD= Akinwunmipg
// DB_USERNAME = postgres
// DB_PORT = 5432
// DB_HOST = localhost
// DB_DATABASE

import { User } from './src/Entity/user.entity';
import { Wallet } from './src/Entity/wallet.entity';
export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: 5432, //3306,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: ["src/app/entities/**/*.ts"],
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: ["src/app/subscribers/**/*.ts"],
})