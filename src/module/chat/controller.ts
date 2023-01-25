import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../../../types/express";
import handleResponse from "../../middlewares/response";
import logger from "../../utils/logger";
import { MESSAGES } from "../../constants";

class ChatController {
    static async storeMessage(req: IGetUserAuthInfoRequest, res: Response){
        try {
            
        } catch (error: any) {
            console.log(error);
            logger(module).info(
                `${500} - ${req.method} - ${req.socket.remoteAddress}- ${
                  req.originalUrl
                } - ${error.message}`
              );
              return handleResponse(
                req,
                res,
                {
                  status: "error",
                  message: MESSAGES.STATUS500,
                },
                500
              );
        }
    }
}

export default ChatController;