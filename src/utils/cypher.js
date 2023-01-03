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
const crypto_1 = __importDefault(require("crypto"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let { RESPONSE_AESKEY, RESPONSE_IVKEY } = process.env;
class Cypher {
    static encrypt(text, aesKey, ivKey, algorithm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cypher = crypto_1.default.createCipheriv(algorithm, Buffer.from(aesKey), ivKey);
                let encrypted = cypher.update(JSON.stringify(text));
                encrypted = Buffer.concat([encrypted, cypher.final()]);
                return encrypted.toString("hex");
            }
            catch (error) {
                return null;
            }
        });
    }
    static decrypt(text, aesKey, ivKey, algorithm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const encryptedText = Buffer.from(text, "hex");
                const decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(aesKey), ivKey);
                let decrypted = decipher.update(encryptedText);
                decrypted = Buffer.concat([decrypted, decipher.final()]);
                return JSON.parse(decrypted.toString());
            }
            catch (error) {
                return null;
            }
        });
    }
    static encryptWallet(text, aesKey, ivKey, algorithm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const iv = Buffer.alloc(16, ivKey);
                let cipher = crypto_1.default.createCipheriv(algorithm, aesKey, iv);
                let encrypted = cipher.update(text);
                encrypted = Buffer.concat([encrypted, cipher.final()]);
                return encrypted.toString("hex");
            }
            catch (error) {
                throw error;
            }
        });
    }
    static decryptWallet(text, aesKey, ivKey, algorithm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!text)
                    return;
                const iv = Buffer.alloc(16, ivKey);
                let decipher = crypto_1.default.createDecipheriv(algorithm, aesKey, iv);
                let dec = decipher.update(text, "hex", "utf8");
                dec += decipher.final("utf8");
                return JSON.parse(dec);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static cryptoJSEncrypt(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (RESPONSE_AESKEY && RESPONSE_IVKEY) {
                const key = crypto_js_1.default.enc.Hex.parse(RESPONSE_AESKEY);
                const iv = crypto_js_1.default.enc.Hex.parse(RESPONSE_IVKEY);
                return crypto_js_1.default.AES.encrypt(payload, key, {
                    iv,
                }).toString();
            }
            throw new Error("AES and IV keys must be set");
        });
    }
    static cryptoJSDecrypt(text) {
        return __awaiter(this, void 0, void 0, function* () {
            if (RESPONSE_AESKEY && RESPONSE_IVKEY) {
                const key = crypto_js_1.default.enc.Hex.parse(RESPONSE_AESKEY);
                const iv = crypto_js_1.default.enc.Hex.parse(RESPONSE_IVKEY);
                const decryptedData = crypto_js_1.default.AES.decrypt(text, key, {
                    iv,
                }).toString(crypto_js_1.default.enc.Utf8);
                return decryptedData;
            }
            throw new Error("AES and IV keys must be set");
        });
    }
}
exports.default = Cypher;
