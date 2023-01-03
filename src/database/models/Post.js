"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const Comment_1 = require("./Comment");
const postSchema = new mongoose_1.Schema({
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: Comment_1.CommentModel
        }
    ],
    likeCount: {
        type: Number,
    },
    content: {
        type: String,
    },
    fileUrl: {
        type: String,
    },
    // this will objectId, will update
    likedBy: [
        {
            type: String
        }
    ]
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
const PostModel = (0, mongoose_1.model)("Posts", postSchema);
exports.PostModel = PostModel;
