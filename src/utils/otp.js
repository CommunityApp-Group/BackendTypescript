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
exports.validateOTP = exports.generateOTP = void 0;
const moment_1 = __importDefault(require("moment"));
const constants_1 = require("../constants");
const service_1 = __importDefault(require("../module/auth/service"));
const logger_1 = __importDefault(require("./logger"));
const generateOTP = (length = 6) => {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
};
exports.generateOTP = generateOTP;
const validateOTP = (otp, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userOtp = yield service_1.default.findUserOtp(phoneNumber);
        if (!userOtp) {
            throw { message: "There is no OTP created for this user" };
        }
        if (userOtp.token !== otp) {
            throw { message: "OTP mismatch. Please crosscheck the OTP sent to you" };
        }
        if (userOtp.status === constants_1.OTPSTATUS.EXPIRED) {
            throw { message: "OTP has expired" };
        }
        if (userOtp.status === constants_1.OTPSTATUS.USED) {
            throw { message: "OTP has been used already" };
        }
        const hasExpired = (0, moment_1.default)().format("YYYY-MM-DD H:m:s") >
            (0, moment_1.default)(userOtp.expireAt).format("YYYY-MM-DD H:m:s");
        if (hasExpired) {
            yield service_1.default.updateOtp(userOtp, { status: constants_1.OTPSTATUS.EXPIRED });
            throw { message: "Your OTP has expired. Please request for another one" };
        }
        yield service_1.default.updateOtp(userOtp, { status: constants_1.OTPSTATUS.USED });
        (0, logger_1.default)(module).info(`OTP validated successfully - ${phoneNumber} - ${otp}`);
        return { status: "success", message: "OTP validated" };
    }
    catch (e) {
        (0, logger_1.default)(module).error(`Failed to validate otp ${(e === null || e === void 0 ? void 0 : e.message) || e}`);
        return {
            status: "error",
            message: (e === null || e === void 0 ? void 0 : e.message) || "An error occurred. Please try again",
        };
    }
});
exports.validateOTP = validateOTP;
