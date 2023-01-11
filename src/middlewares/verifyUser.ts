import { Request, Response, NextFunction } from "express";
// import { userInfo } from './userInfo'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import _ from "lodash";
import { User } from "../Entity/user.entity";
import handleResponse from "./response";
import logger from "../utils/logger";
import { MESSAGES } from "../constants";
import { IGetUserAuthInfoRequest } from "../../types/express";
import { AppDataSource } from "../../app-data-source";
const UserModel = AppDataSource.getRepository(User);

dotenv.config();
let { JWT_SECRET_KEY } = process.env;

export interface decodepLoad {
  id: any;
}

const verifyUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "Authorization token is invalid",
        },
        401
      );
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "Authorization token is missing",
        },
        401
      );
    }

    if (!JWT_SECRET_KEY) JWT_SECRET_KEY = "secret";
    const decoded = jwt.verify(token, <any>JWT_SECRET_KEY) as decodepLoad;

    const user = await UserModel.findOneBy(decoded.id);

    if (!user || (user && user.accessToken !== token)) {
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "Failed to authenticate user",
        },
        401
      );
    }
    logger(module).info(
      `Logged in user - ${req.socket.remoteAddress}- ${req.originalUrl} - ${user?.phoneNumber}`
    );
    req.user = user;
    next();
  } catch (error: any) {
    logger(module).info(
      `${500} - ${req.method} - ${req.socket.remoteAddress}- ${
        req.originalUrl
      } - ${error.message}`
    );
    console.log(error);
    let message = MESSAGES.STATUS500;
    if (error?.name === "TokenExpiredError") {
      message = MESSAGES.TOKENEXPIRED;
    } else if (error?.name === "JsonWebTokenError") {
      message = MESSAGES.INVALIDTOKEN;
    } else {
      message = MESSAGES.STATUS500;
    }
    return handleResponse(
      req,
      res,
      {
        status: "error",
        message,
      },
      401
    );
  }
};

export default verifyUser;
