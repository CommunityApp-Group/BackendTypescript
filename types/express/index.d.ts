
import { Request } from "express";
import { User } from "../../src/Entity/user.entity";
export interface IGetUserAuthInfoRequest extends Request {
  user?: User;
  file?: any;
  image?: any
  xDeviceData?: any;
}