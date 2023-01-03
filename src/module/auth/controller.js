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
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_1 = __importDefault(require("../../middlewares/response"));
const constants_1 = require("../../constants");
const logger_1 = __importDefault(require("../../utils/logger"));
const service_1 = __importDefault(require("../user/service"));
const generateAccessToken_1 = __importDefault(require("../../middlewares/generateAccessToken"));
const { BRCYPT_SALT, NODE_ENV, OTP_EXPIRES_IN } = process.env;
class AuthController {
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, username, lastName, email, phoneNumber, password, confPassword, dob } = req.body;
                const query = {
                    $or: [
                        {
                            phoneNumber: new RegExp(phoneNumber.substring(phoneNumber.length - 10), "i"),
                        },
                        { email: email.toLowerCase() },
                    ],
                };
                if (password !== confPassword)
                    return (0, response_1.default)(req, res, {
                        status: "error",
                        message: "password did not match",
                    }, 400);
                let findUser = yield service_1.default.findUser(query);
                if (findUser === null || findUser === void 0 ? void 0 : findUser.isDeleted)
                    return (0, response_1.default)(req, res, {
                        status: "error",
                        message: "There is an error creating an account with this credentials, please kindly reach out to the admin",
                    }, 400);
                if (findUser)
                    return (0, response_1.default)(req, res, {
                        status: "error",
                        message: "The phone number or email exists for another user",
                    }, 400);
                const hashedPassword = yield bcrypt_1.default.hash(password.toString(), Number(BRCYPT_SALT));
                const userInput = {
                    firstName,
                    lastName,
                    username,
                    password: hashedPassword,
                    phoneNumber: phoneNumber
                        .replace(/\s+/g, "")
                        .replace(/[{()}]/g, "")
                        .replace(/[-]/g, ""),
                    email: email.toLowerCase(),
                    dob,
                };
                let user = yield service_1.default.storeUser(userInput);
                const accessToken = yield (0, generateAccessToken_1.default)({
                    id: user.id,
                    phoneNumber: user.phoneNumber,
                });
                user = yield service_1.default.updateUser(user, { accessToken });
                return (0, response_1.default)(req, res, {
                    status: "success",
                    message: "Sign up was successful",
                    data: {
                        user: {
                            username: user === null || user === void 0 ? void 0 : user.username,
                            firstName: user === null || user === void 0 ? void 0 : user.firstName,
                            lastName: user === null || user === void 0 ? void 0 : user.lastName,
                            id: user === null || user === void 0 ? void 0 : user.id,
                            dob: user === null || user === void 0 ? void 0 : user.dob,
                            phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
                            email: user === null || user === void 0 ? void 0 : user.email,
                        },
                        accessToken,
                    },
                }, 201);
            }
            catch (error) {
                (0, logger_1.default)(module).info(`${500} - ${req.method} - ${req.socket.remoteAddress}- ${req.originalUrl} - ${error.message}`);
                console.log(error);
                return (0, response_1.default)(req, res, {
                    status: "error",
                    message: constants_1.MESSAGES.STATUS500,
                }, 500);
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phoneNumber, password } = req.body;
                let user = yield service_1.default.findUser({
                    phoneNumber: new RegExp(phoneNumber.substring(phoneNumber.length - 10), "i"),
                });
                if (!user)
                    return (0, response_1.default)(req, res, { status: "error", message: "Username or pin is incorrect" }, 401);
                if (user.isDeleted)
                    return (0, response_1.default)(req, res, { status: "error", message: "Account does not exist" }, 400);
                const isPasswordCorrect = bcrypt_1.default.compareSync(password, user.password);
                if (!isPasswordCorrect)
                    return (0, response_1.default)(req, res, { status: "error", message: "Username or password is incorrect" }, 401);
                const accessToken = yield (0, generateAccessToken_1.default)({
                    id: user.id,
                    phoneNumber: user.phoneNumber,
                });
                user = yield service_1.default.updateUser(user, { accessToken });
                return (0, response_1.default)(req, res, {
                    status: "success",
                    message: "User signed in successfully",
                    data: {
                        user: {
                            firstName: user === null || user === void 0 ? void 0 : user.firstName,
                            lastName: user === null || user === void 0 ? void 0 : user.lastName,
                            id: user === null || user === void 0 ? void 0 : user.id,
                            phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
                            email: user === null || user === void 0 ? void 0 : user.email,
                        },
                        accessToken,
                    },
                }, 200);
            }
            catch (error) {
                console.log(error);
                (0, logger_1.default)(module).info(`${500} - ${req.method} - ${req.socket.remoteAddress}- ${req.originalUrl} - ${error.message}`);
                return (0, response_1.default)(req, res, { status: "error", message: constants_1.MESSAGES.STATUS500 }, 500);
            }
        });
    }
    static sendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                let user = yield service_1.default.findUser(email);
                if (!user) {
                    return (0, response_1.default)(req, res, { status: "error", message: "Users does not exist" }, 404);
                }
            }
            catch (error) {
            }
        });
    }
}
exports.default = AuthController;
