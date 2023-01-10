
import { AppDataSource } from "../../../app-data-source";

import { User } from "../../Entity/user.entity";

const UserModel = AppDataSource.getRepository(User);
interface UserQuery {
    status?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    dob?: Date;
    accessToken?: string;
    isActivated?: boolean;
    profilePicture?: string;
    isDeleted?: boolean
}

class UserService {
    static async storeUser(payload: UserQuery){
        const user = await UserModel.create(payload);
        return user;
    }

    static async findUser(query: Object) {
        const user = await UserModel.findOne(query);
        return user;
    }
    static async findUserById(userId: any) {
        const user = await UserModel.findOne(userId);
        return user;
      }
    
    // static async findUsers(query: Object): Promise<(User & { _id: any })[]> {
    //     const users = await UserModel.find(query);
    //     return users;
    // }
    static async updateUser(user: any, payload: UserQuery) {
        for (const key in payload) {
          if (Object.prototype.hasOwnProperty.call(payload, key)) {
            const val = payload[key];
            user[key] = val;
          }
        }
        await user.save();
        return user;
      }

    // static async deleteAccount(userId: any){
    //     const user = await UserModel.updateOne(
    //       { isDeleted: true },
    //       {
    //         where: {
    //           id: userId,
    //         },
    //       }
    //     );
    //     return user;
    // }
}

export default UserService;
