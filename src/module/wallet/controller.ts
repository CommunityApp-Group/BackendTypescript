import WalletService  from './service';
import { Response } from "express"; 
import { IGetUserAuthInfoRequest } from "../../../types/express";
import handleResponse from '../../middlewares/response';
import logger from '../../utils/logger';
import { MESSAGES } from '../../constants';
import { WalletModel } from '../../database/models/walletz';
import moment from 'moment';
import { TRANSFERSTATUS } from '../../Entity/Transaction.Entity';

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
                const newWallet = await WalletService.createWallet(user.id)
                return handleResponse(
                req,
                res,
                {
                    status: "error",
                    message:
                    "Balance's details cannot be fetched. A new account will now be created for you",
                },
                400
                );
            }
            return res.json(balance);

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
                const createWallet = await WalletService.createWallet(user.id);
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
            if(wallet.userId !== user.id){
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

            return res.json(wallet);

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

    static async fetchExpenseGraph(req:IGetUserAuthInfoRequest, res: Response){
        try {
            const user = req.user;
            // if (!user) {
            //     return handleResponse(
            //       req,
            //       res,
            //       {
            //         status: "error",
            //         message:
            //           "User's details cannot be fetched. Please contact customer care for resolution",
            //       },
            //       400
            //     );
            //   }
              const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
              const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
              const queryPayload = {
                // Sender: user.id,
                CreatedAt: { $gte: `${startOfMonth} 00:00`, $lte: `${endOfMonth} 23:59` },
                Status: TRANSFERSTATUS.SUCCESS,
              };     
              const transactions = await WalletService.fetchTransactions(
                queryPayload
              );
              if (transactions.length == 0) {
                return handleResponse(
                  req,
                  res,
                  {
                    status: "error",
                    message: "No data available",
                  },
                  400
                );
              }   

              let totalSpent = 0.0;
                const categorySet = new Set();
                for (let i = 0; i < transactions.length; i++) {
                    totalSpent += parseFloat(transactions[i].Amount);
                    categorySet.add(transactions[i].Type);
                }
                const categories = [...categorySet];
                const finalArr: any = [];
                categories.forEach((category) => {
                    const categoryValues : any = { name: category };
                    let categoryCount = 0;
                    for (let j = 0; j < transactions.length; j++) {
                    if (transactions[j].Type === category) {
                        categoryCount += 1;
                    }
                    }
                    categoryValues["percentage"] = (
                    (categoryCount / transactions.length) *
                    100
                    ).toFixed(2);
                    finalArr.push(categoryValues);
                });
               const  data= { graph: finalArr, totalSpent };
                return res.json(data)
                return handleResponse(
                    req,
                    res,
                    {
                      status: "success",
                      message: "Expense graph fetched successfully",
                      data: { graph: finalArr, totalSpent },
                    },
                    200
                  );
        } catch (error:any) {
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