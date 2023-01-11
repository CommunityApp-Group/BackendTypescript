import { Router } from "express";
import TransactionController from "./controller";
const router = Router();

router.post("/saveTransaction",
TransactionController.storeTranscaction
);

router.get("/transactions",

TransactionController.transactions
)

export default router;