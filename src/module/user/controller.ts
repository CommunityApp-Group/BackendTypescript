import { IGetUserAuthInfoRequest } from "../../../types/express";
import { Response } from "express";
import UserService from "./service";
import handleResponse from "../../middlewares/response";
import bcrypt from "bcrypt";
import AccessToken from "../../middlewares/generateAccessToken";
import logger from "../../utils/logger";
import { MESSAGES } from "../../constants";

class UserController {

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
            // await user.accessToken = accessToken;
            // await user.save()
            user = await UserService.updateUser(user, { accessToken });

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