import { IGetUserAuthInfoRequest } from "../../../types/express";
import { Response } from "express";
import UserService from "./service";
import handleResponse from "../../middlewares/response";
import bcrypt from "bcrypt";
import argon from "argon2";
import AccessToken from "../../middlewares/generateAccessToken";
import logger from "../../utils/logger";
import { MESSAGES } from "../../constants";
import dotenv from "dotenv";

dotenv.config();
let { BCRYPT_SALT } = process.env;

class UserController {

    static async signUp(req:IGetUserAuthInfoRequest, res:Response){
        try {
            const { username, password, lastname, firstname, phoneNumber} = req.body;
            let user;
            user = await UserService.findUser(username);
            if(user){
                return handleResponse(
                    req,
                    res,
                    {
                        status: "error",
                        message:
                        "credential already exist. Please provide another credential",
                    },
                    400
                    );
            }
            const salt = await bcrypt.genSalt()
            const hashedPin = await argon.hash(`${password}`);// await bcrypt.hash(password.toString(), Number(salt));
            console.log("dddd")
            const userInput = {
                firstname,
                lastname,
                username,
                phoneNumber,
                password: hashedPin
            }
             user = await UserService.storeUser(userInput);
            const accessToken = await AccessToken({
                id: user.id,
                phoneNumber: user.phoneNumber,
            });
            // user = await UserService.updateUser(user, { accessToken });
            user.accessToken = accessToken;
            user.lastname = lastname;
            user.firstname = firstname;
            user.username = username;
            user.password = hashedPin;
            user.phoneNumber = phoneNumber;
            await user.save();
            const response = {
                status: "success",
                message: "Sign up was successful",
                data: {
                  user: {
                    firstName: user?.firstname,
                    lastName: user?.lastname,
                    id: user?.id,
                    phoneNumber: user?.phoneNumber,
                    userName: user?.username,
                    },
                  accessToken,
                },
            }
            return res.json(response);
            
      return handleResponse(
        req,
        res,
        {
          status: "success",
          message: "Sign up was successful",
          data: {
            user: {
              firstName: user?.firstname,
              lastName: user?.lastname,
              id: user?.id,
              phoneNumber: user?.phoneNumber,
              userName: user?.username,
              },
            accessToken,
          },
        },
        201
      );
        } catch (error: any) {
            logger(module).info(
                `${500} - ${req.method} - ${req.socket.remoteAddress}- ${
                  req.originalUrl
                } - ${error.message}`
              );
              return res.json(error);
              return handleResponse(
                req,
                res,
                { status: "error", message: MESSAGES.STATUS500 },
                500
              );
        }
    }

    static async login(req:IGetUserAuthInfoRequest, res:Response){
        try {
            const {username, password} = req.body;
            let user = await UserService.findUser(username);
            if(!user){
                return handleResponse(
                    req,
                    res,
                    {
                        status: "error",
                        message:
                        "User's details cannot be fetched. Please contact customer care for resolution",
                    },
                    400
                    );
            }

            const isPinCorrect = bcrypt.compareSync(password, user.password);
            if (!isPinCorrect)
                return handleResponse(
                req,
                res,
                { status: "error", message: "Username or pin is incorrect" },
                401
                );
            const accessToken = await AccessToken({
                    id: user.id,
                    phoneNumber: user.phoneNumber,
                  });
            user.accessToken = accessToken;
            await user.save()
            // user = await UserService.updateUser(user, { accessToken });

            return handleResponse(
                req,
                res,
                {
                  status: "success",
                  message: "User signed in successfully",
                  data: {
                    user: {
                      firstName: user?.firstname,
                      lastName: user?.lastname,
                      id: user?.id,
                      phoneNumber: user?.phoneNumber,
                      userName: user?.username,
                    },
                    accessToken,
                  },
                },
                200
              );
        } catch (error:any) {
            logger(module).info(
                `${500} - ${req.method} - ${req.socket.remoteAddress}- ${
                  req.originalUrl
                } - ${error.message}`
              );
              return handleResponse(
                req,
                res,
                { status: "error", message: MESSAGES.STATUS500 },
                500
              );
        }
    }
}

export default UserController;