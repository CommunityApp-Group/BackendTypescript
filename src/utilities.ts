import { Router, Request, Response } from "express";
// import { BillCategoryModel, UserModel } from "../database/models";
// import AzureService from "../services/azure";
// import compressImage from "../utils/compressImage";
import Cypher from "./utils/cypher";
// import multer from "../utils/multer";
// import random from "../utils/randomString";
// import WalletService from "../services/wallet";
// import SingletonEmitter from "../eventStore";
// import EVENTS from "../constants/events";
// import UserService from "./user/service";
// import processUserDeviceContacts from "../utils/processUserDeviceContacts";
// import BillPayment from "../services/bill";
// import InterPay from "../utils/interPay";
// import logger from "../utils/logger";
// import { BILLIMAGES } from "../constants";

// const { RESPONSE_AESKEY, RESPONSE_IVKEY, RESPONSE_ALGORITHM } = process.env;

const router = Router();

router.post("/decrypt", async (req: Request, res: Response) => {
  try {
    const decrypted = await Cypher.cryptoJSDecrypt(req.body.data);
    return res.json(JSON.parse(decrypted));
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

router.post("/encrypt", async (req: Request, res: Response) => {
  try {
    const text = JSON.stringify(req.body);
    const decrypted = await Cypher.cryptoJSEncrypt(text);
    return res.json({ data: decrypted });
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

export default router;
