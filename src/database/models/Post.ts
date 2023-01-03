import mongoose , { Schema, model } from "mongoose";
import { CommentModel } from "./Comment";
import { UserModel } from "./User"

interface Post extends mongoose.Document {
    id: string;
    comments: Array<string>;
    likedBy: Array<any>;
    likeCount: Number;
    content: string;
    fileUrl? : string;
}
  
type PostInput = {
    // comments? : Post["comments"];
    content?: Post["content"];
    fileUrl? : Post["fileUrl"],
    
};

const postSchema = new Schema<Post> (
    {
        comments : [
            {
                type: Schema.Types.ObjectId,
                ref: CommentModel
                 
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

const PostModel  = model<Post>("Posts", postSchema);

export { Post, PostModel, PostInput };