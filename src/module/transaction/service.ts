import { Transaction } from "../../Entity/Transaction.Entity";
import { AppDataSource } from "../../../app-data-source";

const TransactionModel = AppDataSource.getRepository(Transaction);

interface TransactionQuery{
    Amount: string
    Purpose: string
    Type: string
}

class TransactionService {
    static async storeTransaction(payload: TransactionQuery){
        // const transaction = await TransactionModel.create(payload);
        const transaction = await AppDataSource.createQueryBuilder()
            .insert()
            .into(Transaction)
            .values([
                { Amount: payload.Amount, Purpose: payload.Purpose, Type: payload.Type },
            ])
            .execute()
        // const transaction = new Transaction();
        // transaction.Amount = payload.Amount;
        // transaction.Purpose = payload.Purpose;
        // transaction.Type = payload.Type;
        // await transaction.save()
        return transaction;
    }

    static async RecentTransaction(){
        const transactions = await AppDataSource
        .getRepository(Transaction)
        .createQueryBuilder("transaction")
        .take(3)
        .getMany() //TransactionModel.createQueryBuilder().orderBy('DESC').limit(10)
        return transactions;
    }
}

export default TransactionService;