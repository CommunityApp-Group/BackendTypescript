import { Message } from '../../Entity/Message.Entity';
import { Transaction } from '../../Entity/Transaction.Entity';
import { User } from "../../Entity/user.entity";
import {DataSource } from 'typeorm';
import { AppDataSource } from '../../../app-data-source';
import { UUIDV4 } from 'sequelize';

const MessageModel = AppDataSource.getRepository(Message);

const TransactionModel = AppDataSource.getRepository(Transaction);

interface messageQuery {
    message?: any;
    receiver?: string;
    sender: string;
    type: string;
}

class MessageService {
    static async storeMessage(){

    }
}

