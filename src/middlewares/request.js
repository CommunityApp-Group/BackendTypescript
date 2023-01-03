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
const response_1 = __importDefault(require("./response"));
dotenv_1.default.config();
const { RESPONSE_AESKEY, RESPONSE_IVKEY, RESPONSE_ALGORITHM } = process.env;
const handleRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!["POST", "PUT", "PATCH"].includes(req.method))
            return next();
        if (!req.body.data)
            return (0, response_1.default)(req, res, { error: "Data is missing in the request body" }, 422);
        const encryptedPayload = req.body.data;
        const decryptedData = yield cypher_1.default.cryptoJSDecrypt(encryptedPayload);
        req.body = JSON.parse(decryptedData);
        const requestBody = Object.assign({}, req.body);
        if (requestBody.password)
            delete requestBody.password;
        if (requestBody.dob)
            delete requestBody.dob;
        if (requestBody.phoneNumbers)
            delete requestBody.phoneNumbers;
        (0, logger_1.default)(module).info(`${req.method} - ${req.ip}- ${req.originalUrl} - ${JSON.stringify(requestBody)}`);
        return next();
    }
    catch (error) {
        return (0, response_1.default)(req, res, { error: error.message }, 400);
    }
});
exports.default = handleRequest;
