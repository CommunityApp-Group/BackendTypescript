"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const Post_1 = require("./Post");
const commentSchema = new mongoose_1.Schema({
    text: {
        type: String,
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: Post_1.PostModel
    },
    imageUrl: {
        type: String
    }
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
const CommentModel = (0, mongoose_1.model)("Comments", commentSchema);
exports.CommentModel = CommentModel;
