"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
const UserSchema = new mongoose_1.Schema({
    password: {
        type: mongoose_1.Schema.Types.String,
        select: true,
    },
    username: {
        type: mongoose_1.Schema.Types.String,
        select: true,
    },
    status: {
        type: mongoose_1.Schema.Types.String,
        default: constants_1.USERSTATUSES.ACTIVE,
    },
    firstName: {
        type: mongoose_1.Schema.Types.String,
        select: true,
    },
    lastName: {
        type: mongoose_1.Schema.Types.String,
        select: true,
    },
    phoneNumber: {
        type: mongoose_1.Schema.Types.String,
        select: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    dob: {
        type: Date,
        select: true,
    },
    lastLogin: { type: Date, select: true },
    accessToken: { type: String },
    isActivated: { type: Boolean, default: false },
    profilePicture: { type: String },
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
const UserModel = (0, mongoose_1.model)("Users", UserSchema);
exports.UserModel = UserModel;
