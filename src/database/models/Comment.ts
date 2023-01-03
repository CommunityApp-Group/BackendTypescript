import mongoose , { Schema, model } from "mongoose";
import { PostModel } from "./Post";

interface Comment extends mongoose.Document {
    id: string;
    text: string;
    imageUrl? : string;
    post? : string;
}
  
type CommentInput = {
    text: Comment["text"];
    post: Comment["post"];
    imageUrl? : Comment["imageUrl"],
    
};

const commentSchema = new Schema<Comment> (
    {
        text : {
                type: String,
                
            },
        post: {
            type: Schema.Types.ObjectId,
            ref: PostModel
        },
        imageUrl: {
            type: String
        }
    },
    {
        timestamps: true,
        toJSON: {
          transform(doc, ret) {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
          },
        },
    },
);

const CommentModel : Object = model<Comment>("Comments", commentSchema);

export { Comment, CommentModel, CommentInput };