
import { Wallet } from '../../Entity/wallet.entity';
import { Transaction } from '../../Entity/Transaction.Entity';
import { User } from "../../Entity/user.entity";
import {DataSource } from 'typeorm';
import { AppDataSource } from '../../../app-data-source';
import { UUIDV4 } from 'sequelize';

const WalletModel = AppDataSource.getRepository(Wallet);

const TransactionModel = AppDataSource.getRepository(Transaction);

interface WalletQuery{
    Balance?: number
    userId: string
}

class WalletService {
    static async createWallet(payload: any){
        const wallet =   await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(Wallet)
            .values([
                { userId: payload },
            ])
            .execute()

        return wallet;
    

    }
    static async getWalletBalance(id: string ){
        const Balance = await WalletModel.findOneBy({userId: id});
        return Balance;
    }; 
    
    static async updateBalance(balance: WalletQuery, user: User){
        const Balance = WalletModel.create(balance)
        return Balance;
    }
    static async fetchTransactions(query: Object) {
        const transaction = await TransactionModel.find(query);
        return transaction;
      }
}

export default WalletService;
