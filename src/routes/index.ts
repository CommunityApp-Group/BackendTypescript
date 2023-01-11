import express from "express";
import handleRequest from "../middlewares/request";
import validateUserDevice from "../middlewares/validateUserDevice";
import verifyUser from "../middlewares/verifyUser";
import {
WalletRoute, UserRoute
} from "../module"; 

const app = express();

app.use("/wallet", verifyUser, WalletRoute);
app.use("/user", UserRoute);


export default app;
