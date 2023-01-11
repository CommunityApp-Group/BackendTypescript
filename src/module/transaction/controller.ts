import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../../../types/express";
import { MESSAGES } from "../../constants";
import handleResponse from "../../middlewares/response";
import logger from "../../utils/logger";
import TransactionService from "./service";

class TransactionController {
    static async storeTranscaction(req: IGetUserAuthInfoRequest, res:Response){
        try {
            const { Amount, Purpose, Type} = req.body;
            // const user = req.user;
            let transaction;
            const payload = {
                Amount,
                Purpose,
                Type
            }
            transaction = await TransactionService.storeTransaction(payload);

            return res.json(transaction);
            
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

    static async transactions(req:IGetUserAuthInfoRequest, res:Response){
        try {
            const transactions = await TransactionService.RecentTransaction();
            return res.json(transactions);
        } catch (error: any) {
            logger(module).info(
                `${500} - ${req.method} - ${req.socket.remoteAddress}- ${
                  req.originalUrl
                } - ${error.message}`
              );
              console.log(error);
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

export default TransactionController;