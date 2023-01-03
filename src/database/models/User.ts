import mongoose, { Schema, model } from "mongoose";
import { USERSTATUSES } from "../../constants";

interface User extends mongoose.Document {
  id: string;
  username: string;
  password: string;
  status?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: Date;
  lastLogin?: Date;
  accessToken?: string;
  isActivated?: boolean;
  profilePicture?: string;
  isDeleted?: boolean
}

type UserInput = {
  firstName: User["firstName"];
  username: User["username"];
  lastName: User["lastName"];
  password: User["password"],
  phoneNumber: User["phoneNumber"];
  dob: User["dob"];
  email: User["email"]
  profilePicture?: User["profilePicture"];
};

const UserSchema = new Schema<User>(
  {
    password: {
      type: Schema.Types.String,
      select: true,
    },
    username: {
      type: Schema.Types.String,
      select: true,
    },
    status: {
      type: Schema.Types.String,
      default: USERSTATUSES.ACTIVE,
    },
    firstName: {
      type: Schema.Types.String,
      select: true,
    },
    lastName: {
      type: Schema.Types.String,
      select: true,
    },
    phoneNumber: {
      type: Schema.Types.String,
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
  }
);

const UserModel = model<User>("Users", UserSchema);
// also should extends the generic type i.e model<User> so we don't get an empty schema
// though you alredy extends it in the schema declaration. i hope that will work

export { User, UserModel, UserInput };
