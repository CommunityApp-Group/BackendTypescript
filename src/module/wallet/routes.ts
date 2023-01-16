import { Router } from "express";
import verifyUser from "../../middlewares/verifyUser";
import WalletController from "./controller";
import WalletValidator from "./validator";

const router = Router();

router.get("/balance",
WalletController.getBalance
);

router.put("/updateBalance",
WalletValidator.updateBalanceValidation,
WalletController.updateBalance
);

router.get("/expenseGraph",

WalletController.fetchExpenseGraph)

export default router;
