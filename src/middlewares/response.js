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
const dotenv_1 = __importDefault(require("dotenv"));
const cypher_1 = __importDefault(require("../utils/cypher"));
const logger_1 = __importDefault(require("../utils/logger"));
dotenv_1.default.config();
const handleResponse = (req, res, payload, statusCode) => __awaiter(void 0, void 0, void 0, function* () {
    const ipAddress = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    let responseDataAsString = JSON.stringify(payload);
    // if (
    //   req.originalUrl.includes("status") ||
    //   req.originalUrl.includes("contacts") ||
    //   req.originalUrl.includes("chat") ||
    //   req.originalUrl.includes("transactions")
    // ) {
    //   logger(module).info(
    //     `${statusCode} - ${req.method} - ${ipAddress}- ${req.originalUrl} - ${
    //       statusCode >= 400 ? responseDataAsString : "success"
    //     }`
    //   );
    // } else {
    //   logger(module).info(
    //     `${statusCode} - ${req.method} - ${ipAddress}- ${req.originalUrl} - ${responseDataAsString}`
    //   );
    // }
    (0, logger_1.default)(module).info(`${statusCode} - ${req.method} - ${ipAddress}- ${req.originalUrl} - ${statusCode >= 400 ? responseDataAsString : "success"}`);
    const encryptedData = yield cypher_1.default.cryptoJSEncrypt(JSON.stringify(payload));
    return res.status(statusCode).send({
        data: encryptedData,
    });
});
exports.default = handleResponse;
