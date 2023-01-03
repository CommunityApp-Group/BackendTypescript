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
// import { userInfo } from './userInfo'
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../database/models");
const response_1 = __importDefault(require("./response"));
const logger_1 = __importDefault(require("../utils/logger"));
const constants_1 = require("../constants");
dotenv_1.default.config();
let { JWT_SECRET_KEY } = process.env;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.header("Authorization");
        if (!authorization) {
            return (0, response_1.default)(req, res, {
                status: "error",
                message: "Authorization token is invalid",
            }, 401);
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return (0, response_1.default)(req, res, {
                status: "error",
                message: "Authorization token is missing",
            }, 401);
        }
        if (!JWT_SECRET_KEY)
            JWT_SECRET_KEY = "secret";
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        const user = yield models_1.UserModel.findById(decoded.id);
        if (!user || (user && user.accessToken !== token)) {
            return (0, response_1.default)(req, res, {
                status: "error",
                message: "Failed to authenticate user",
            }, 401);
        }
        (0, logger_1.default)(module).info(`Logged in user - ${req.socket.remoteAddress}- ${req.originalUrl} - ${user === null || user === void 0 ? void 0 : user.phoneNumber}`);
        req.user = user;
        next();
    }
    catch (error) {
        (0, logger_1.default)(module).info(`${500} - ${req.method} - ${req.socket.remoteAddress}- ${req.originalUrl} - ${error.message}`);
        console.log(error);
        let message = constants_1.MESSAGES.STATUS500;
        if ((error === null || error === void 0 ? void 0 : error.name) === "TokenExpiredError") {
            message = constants_1.MESSAGES.TOKENEXPIRED;
        }
        else if ((error === null || error === void 0 ? void 0 : error.name) === "JsonWebTokenError") {
            message = constants_1.MESSAGES.INVALIDTOKEN;
        }
        else {
            message = constants_1.MESSAGES.STATUS500;
        }
        return (0, response_1.default)(req, res, {
            status: "error",
            message,
        }, 401);
    }
});
exports.default = verifyUser;
