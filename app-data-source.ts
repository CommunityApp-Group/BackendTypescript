import {DataSource } from 'typeorm';

import { User } from './src/Entity/user.entity';
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "mysql",
    password: "my-secret-pw",
    database: "testmysql",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})