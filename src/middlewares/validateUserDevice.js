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
const constants_1 = require("../constants");
const device_1 = __importDefault(require("../services/device"));
const logger_1 = __importDefault(require("../utils/logger"));
const response_1 = __importDefault(require("./response"));
const validateUserDevice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.headers["x-device-data"] ||
            typeof req.headers["x-device-data"] !== "string") {
            return (0, response_1.default)(req, res, {
                status: "error",
                message: "x-device-data is missing in the header",
            }, 401);
        }
        let xDeviceData = null;
        try {
            xDeviceData = JSON.parse(req.headers["x-device-data"]);
        }
        catch (error) {
            return (0, response_1.default)(req, res, {
                status: "error",
                message: "Incorrect format for x-device-data",
            }, 401);
        }
        if (!xDeviceData) {
            return (0, response_1.default)(req, res, {
                status: "error",
                message: "x-device-data is missing in the header",
            }, 401);
        }
        const imei = xDeviceData.imei;
        if (!imei)
            return (0, response_1.default)(req, res, {
                status: "error",
                message: "Device imei is missing in the x-device-data header",
            }, 401);
        req.xDeviceData = xDeviceData;
        if (req.originalUrl.includes("auth")) {
            return next();
        }
        const findDevice = yield device_1.default.findDevice({ imei });
        if (!findDevice)
            return (0, response_1.default)(req, res, {
                status: "error",
                message: "This device is not registered",
            }, 401);
        if (findDevice.userId.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString()))
            return (0, response_1.default)(req, res, {
                status: "error",
                message: "This device is not registered for this user",
            }, 401);
        return next();
    }
    catch (error) {
        console.log(error);
        (0, logger_1.default)(module).info(`${500} - ${req.method} - ${req.socket.remoteAddress}- ${req.originalUrl} - ${error.message}`);
        return (0, response_1.default)(req, res, { status: "error", message: constants_1.MESSAGES.STATUS500 }, 500);
    }
});
exports.default = validateUserDevice;
