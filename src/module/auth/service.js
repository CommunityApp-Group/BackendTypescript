"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const constants_1 = require("../../constants");
const models_1 = require("../../database/models");
const { OTP_EXPIRES_IN } = process.env;
class AuthService {
    static findUserOtp(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const userOtp = yield models_1.OtpModel.findOne({ phoneNumber });
            return userOtp;
        });
    }
    static findUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield models_1.UserModel.findOne({ username });
            return findUser;
        });
    }
    static createOtp(phoneNumber, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = { upsert: true, new: true, setDefaultsOnInsert: true };
            const expireAt = (0, moment_1.default)()
                .add(Number(OTP_EXPIRES_IN) || 5, "minutes")
                .format("YYYY-MM-DD H:m:s");
            let query = {
                phoneNumber,
            };
            let update = {
                phoneNumber,
                token,
                expireAt,
                status: constants_1.OTPSTATUS.ACTIVE
            };
            yield models_1.OtpModel.findOneAndUpdate(query, update, options);
            return;
        });
    }
    static updateOtp(otpModel, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const userOtp = yield otpModel.updateOne(query);
            return userOtp;
        });
    }
}
exports.default = AuthService;
