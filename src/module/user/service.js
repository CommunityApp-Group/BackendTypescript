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
Object.defineProperty(exports, "__esModule", { value: true });
// import EVENTS from "../../constants/events";
const models_1 = require("../../database/models");
class UserService {
    static storeUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.UserModel.create(payload);
            return user;
        });
    }
    static findUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.UserModel.findOne(query);
            return user;
        });
    }
    static findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.UserModel.findById(userId);
            return user;
        });
    }
    static findUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield models_1.UserModel.find(query);
            return users;
        });
    }
    static updateUser(user, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const key in payload) {
                if (Object.prototype.hasOwnProperty.call(payload, key)) {
                    const val = payload[key];
                    user[key] = val;
                }
            }
            yield user.save();
            return user;
        });
    }
    static deleteAccount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.UserModel.updateOne({ isDeleted: true }, {
                where: {
                    id: userId,
                },
            });
            return user;
        });
    }
}
exports.default = UserService;
