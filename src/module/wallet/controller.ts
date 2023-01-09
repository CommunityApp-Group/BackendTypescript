import WalletService  from './service';
import { Response } from "express"; 
import { IGetUserAuthInfoRequest } from "../../../types/express";
import handleResponse from '../../middlewares/response';
import logger from '../../utils/logger';
import { MESSAGES } from '../../constants';
import { WalletModel } from '../../database/models/walletz';

class WalletController {

    static async getBalance(req:IGetUserAuthInfoRequest, res: Response){
        try {
            const user = req.user;
            if (!user) {
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
            const balance = await WalletService.getWalletBalance(user.id);
            if (!balance) {
                return handleResponse(
                req,
                res,
                {
                    status: "error",
                    message:
                    "Balance's details cannot be fetched. Please contact customer care for resolution",
                },
                400
                );
            }

            return handleResponse(
                req,
                res,
                {
                  status: "success",
                  message:" Wallet details fetched succesfully",
                  data: balance,
                },
                200
              );
            
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

    static async updateBalance(req: IGetUserAuthInfoRequest, res: Response){
        try {
            const user = req.user;
            const { amount} = req.body;
            const {walletId } = req.params;
            if (!user) {
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
            let wallet = await WalletService.getWalletBalance(walletId)
            if (!wallet) {
                const createWallet = await WalletService.createWallet();
                return handleResponse(
                req,
                res,
                {
                    status: "error",
                    message:
                    "Wallet's details cannot be fetched. A new Wallet will be created for you if wallet does not exist",
                },
                400
                );
            }
            if(wallet.id !== user.id){
                return handleResponse(
                    req,
                    res,
                    {
                    status: "error",
                    message:
                        "This account does not belongs to you. Please contact customer care for resolution",
                    },
                    400
                );
            }
            
            wallet.Balance += amount;
            await wallet.save();

            return handleResponse(
                req,
                res,
                {
                status: "success",
                message: "wallet updated successfully",
                data: wallet,
                },
                200
            );
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

export default WalletController;