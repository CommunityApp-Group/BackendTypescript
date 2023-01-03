import mongoose, { Schema, model } from "mongoose";
import {  OTPSTATUS } from "../../constants";

interface Otp extends mongoose.Document {
  id?: string;
  token: string;
  phoneNumber: string;
  expireAt: string;
  status: string;
}

type OtpInput = {
  token: Otp["token"];
  phoneNumber: Otp["phoneNumber"];
  expireAt: Otp["expireAt"];
  status?: Otp["status"]
};

const OtpSchema = new Schema(
  {
    token: {
      type: Schema.Types.String,
      select: true,
    },
    phoneNumber: {
      type: Schema.Types.String,
      unique: true
    },
    status: {
      type: Schema.Types.String,
      default: OTPSTATUS.ACTIVE,
    },
    expireAt: {
      type: Schema.Types.Date,
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
  }
);

const OtpModel = model<Otp>("Otps", OtpSchema);

export { OtpModel, Otp, OtpInput };
