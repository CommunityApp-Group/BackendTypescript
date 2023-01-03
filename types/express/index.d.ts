
import { Request } from "express";
import { User } from "../../src/database/models/User";
export interface IGetUserAuthInfoRequest extends Request {
  user?: User;
  file?: any;
  image?: any
  xDeviceData?: any;
}