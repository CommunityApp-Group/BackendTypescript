"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../utils/logger"));
dotenv_1.default.config();
const { NODE_ENV, DATABASE_URL, DATABASE_TEST_URL } = process.env;
const url = NODE_ENV === "test" ? DATABASE_TEST_URL || "" : DATABASE_URL || "";
const connectDB = () => {
    mongoose_1.default
        .connect(url)
        .then((result) => (0, logger_1.default)(module).error(`⚡️[Database]: Database connection successful`))
        .catch((err) => {
        console.log(err);
        (0, logger_1.default)(module).error(`Failed to connect to database: ${err.message}`);
        setTimeout(connectDB, 5000);
    });
};
exports.default = connectDB;
