"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const cls_rtracer_1 = __importDefault(require("cls-rtracer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
//const debug = require('node-forge/lib/debug');
const { combine, timestamp, label, printf } = winston_1.format;
const getLogLabel = (callingModule) => {
    const parts = callingModule.filename.split(path_1.default.sep);
    return path_1.default.join(parts[parts.length - 2], parts.pop());
};
const formatDate = () => {
    var d = new Date(), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = "0" + month;
    if (day.length < 2)
        day = "0" + day;
    return `${year}${month}${day}`;
};
const getFile = (type) => {
    const d = formatDate();
    const filename = `logs/${d}${type}.log`;
    fs_1.default.open(filename, "r", function (err, fd) {
        if (err) {
            fs_1.default.writeFile(filename, "", function (err) {
                if (err) {
                    return `logs/${type}.log`;
                }
                return filename;
            });
        }
        else {
            return filename;
        }
    });
    return filename;
};
/**
 * Creates a Winston logger object.
 * ### Log Format
 * *| timestamp | request-id | module/filename | log level | log message |*
 *
 * @param {Module} callingModule the module from which the logger is called
 */
const logger = (callingModule) => (0, winston_1.createLogger)({
    format: combine(winston_1.format.colorize(), label({ label: getLogLabel(callingModule) }), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), printf((info) => {
        const rid = cls_rtracer_1.default.id();
        return rid
            ? `| ${info.timestamp} | ${rid} | ${info.label} | ${info.message} |`
            : `| ${info.timestamp} | ${info.label} | ${info.message} |`;
    })),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            filename: getFile("info"),
            level: "info",
        }),
        new winston_1.transports.File({
            filename: getFile("error"),
            level: "error",
        }),
    ],
    exitOnError: false,
});
exports.default = logger;
