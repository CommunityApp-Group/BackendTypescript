import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import handleResponse from "../../middlewares/response";

class WalletValidator {
  static async updateBalanceValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      amount: Joi.number().messages({
        "number.empty": "amount cannot be empty"
      }),
      
    });

    const { error } = schema.validate(req.body);
    if (error)
      return handleResponse(
        req,
        res,
        { status: "error", message: error.message },
        422
      );
    return next();
  }
}

export default WalletValidator;
