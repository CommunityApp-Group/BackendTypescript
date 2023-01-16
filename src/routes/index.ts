import express from "express";
import handleRequest from "../middlewares/request";
import verifyUser from "../middlewares/verifyUser";
import {
WalletRoute, UserRoute, TransactionRoute, UtilitiesRoute
} from "../module"; 

const app = express();

app.use("/wallet", WalletRoute);
app.use("/transaction", TransactionRoute);
app.use("/user", UserRoute);
app.use("/utilities", UtilitiesRoute);


export default app;
