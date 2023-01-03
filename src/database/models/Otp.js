"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
const OtpSchema = new mongoose_1.Schema({
    token: {
        type: mongoose_1.Schema.Types.String,
        select: true,
    },
    phoneNumber: {
        type: mongoose_1.Schema.Types.String,
        unique: true
    },
    status: {
        type: mongoose_1.Schema.Types.String,
        default: constants_1.OTPSTATUS.ACTIVE,
    },
    expireAt: {
        type: mongoose_1.Schema.Types.Date,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
const OtpModel = (0, mongoose_1.model)("Otps", OtpSchema);
exports.OtpModel = OtpModel;
