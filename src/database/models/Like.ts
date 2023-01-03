import mongoose , { Schema, model } from "mongoose";
import { CommentModel } from "./Comment";
import { UserModel } from "./User"

interface Like extends mongoose.Document {
    id: string;
    user? : string;
}
  
type PostInput = {
    user: Like["user"];
    
};

const LikeSchema = new Schema<Like> (
    {
        user : 
            {
                type: Schema.Types.ObjectId,
                ref: CommentModel
                 
            },

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

const LikeModel : Object = model<Like>("Likes", LikeSchema);

export { Like, LikeModel, PostInput };