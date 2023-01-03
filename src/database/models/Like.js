"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModel = void 0;
const mongoose_1 = require("mongoose");
const Comment_1 = require("./Comment");
const LikeSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: Comment_1.CommentModel
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
const LikeModel = (0, mongoose_1.model)("Likes", LikeSchema);
exports.LikeModel = LikeModel;
