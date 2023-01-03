import mongoose, { Schema, model, Document } from "mongoose";
import { UserModel } from "./User";


interface Wallet extends Document {
    Balance: Number
    User: String
}

type WalletInput = {
    Balance: Wallet["Balance"]
}

const WalletSchema = new Schema<Wallet> (
    {
        Balance: {
            type: Schema.Types.String,
            select: true,
        },
        User: {
            type: Schema.Types.ObjectId,
            ref: UserModel
        }
    },
        {
        timestamps: true,
        toJSON: {
          transform(doc, ret) {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
          },
        },
    }
    
)

const WalletModel = model<Wallet>("Wallets", WalletSchema);
// also should extends the generic type i.e model<User> so we don't get an empty schema
// though you alredy extends it in the schema declaration. i hope that will work

export { Wallet, WalletModel, WalletInput };