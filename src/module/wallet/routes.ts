import { Router } from "express";
import verifyUser from "../../middlewares/verifyUser";
import WalletController from "./controller";
import WalletValidator from "./validator";

const router = Router();

router.get("/balance",
verifyUser,
WalletController.getBalance
);

router.put("/updateBalance",
verifyUser,
WalletValidator.updateBalanceValidation,
WalletController.updateBalance
);

router.get("/expenseGraph",
verifyUser,
WalletController.fetchExpenseGraph)

export default router;
