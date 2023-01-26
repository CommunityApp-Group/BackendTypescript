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
    static async storeMessage(payload: messageQuery){
        const message = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Message)
        .values([
           {message: payload.message, receiver: payload.receiver, sender: payload.sender, type: payload.type} ,
        ])
        .execute()

        return message;
    }

    static async findUsersChats(query: Object){
        const messages = await MessageModel.createQueryBuilder()
        .where({query})
        .getManyAndCount()

        return messages;
    }

    static async findMessageById(messageId: any){
        const message = await MessageModel.findOneBy({id: messageId});
        return message
    }

    static async getChatList (userID: any){
        const chat = await MessageModel.createQueryBuilder()
        .where("sender = :id OR receiver = :id ", { id:userID })
        .getMany();

        return chat;
    }

    static async updateMessageStatus(messageModel: any, status: string) {
        messageModel.status = status;
        await messageModel.save();
        return messageModel;

    }
}

export default MessageService;
