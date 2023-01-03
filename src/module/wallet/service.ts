import moment from "moment";
import { OTPSTATUS } from "../../constants";
import { WalletModel } from "../../database/models";
import { Wallet } from "../../database/models/wallet";
import { User } from "../../database/models/User";
// import SingletonEmitter from "../../eventStore";

interface WalletQuery{
    Balance: string
}

class WalletService {
    static async getWalletBalance(user: User ){
        const Balance = await WalletModel.findOne({
            where: {User: user}
        });
        return Balance;
    }
    static async createBalance(payload: WalletQuery){
        const Balance= await WalletModel.create(payload);
        return Balance;
    }
}
