import moment from "moment";
import { OTPSTATUS } from "../../constants";
import { OtpModel, UserModel } from "../../database/models";
import { User } from "../../database/models/User";

const { OTP_EXPIRES_IN } = process.env;

class AuthService {
    static async findUserOtp(phoneNumber: string) {
        const userOtp = await OtpModel.findOne({ phoneNumber });
        return userOtp;
      }

    static async findUser(username: string){
      const findUser = await UserModel.findOne({username});
      return findUser;
    }
    
      static async createOtp(phoneNumber: string, token: string) {
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        const expireAt = moment()
          .add(Number(OTP_EXPIRES_IN) || 5, "minutes")
          .format("YYYY-MM-DD H:m:s");
        let query = {
          phoneNumber,
        };
        let update = {
          phoneNumber,
          token,
          expireAt,
          status: OTPSTATUS.ACTIVE
        };
        await OtpModel.findOneAndUpdate(query, update, options);
        return;
      }
    
      static async updateOtp(otpModel: any, query: object) {
        const userOtp = await otpModel.updateOne(query);
        return userOtp;
      }
}

export default AuthService;
