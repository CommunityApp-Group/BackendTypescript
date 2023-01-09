
import { Wallet } from '../../Entity/wallet.entity';
import { User } from "../../Entity/user.entity";
import {DataSource } from 'typeorm';
import { AppDataSource } from '../../../app-data-source';
import { UUIDV4 } from 'sequelize';

const WalletModel = AppDataSource.getRepository(Wallet);
interface WalletQuery{
    Balance: number
}

class WalletService {
    static async createWallet(){
        const wallet = await WalletModel.create()
        return wallet;
    }
    static async getWalletBalance(id: string ){
        const Balance = await WalletModel.findOne({
            where: {id}
        });
        return Balance;
    }; 
    
    static async updateBalance(balance: WalletQuery, user: User){
        const Balance = WalletModel.create(balance)
        return Balance;
    }
}

export default WalletService;
