import express, {Express, Request, Response } from "express";
import logger from "./src/utils/logger";
import dotenv from "dotenv";
import connectDB from "./src/database";

dotenv.config();


const app: Express = express()

const PORT = process.env.PORT || Number(8000)
console.log(PORT)

async function onListening() {
    console.log(`Listening on port ${PORT}`);
  }
  app.get("/", (_req: Request, res: Response) => {
    res.send("Community App Backend Server");
  });

// app.listen(PORT, onListening)

app.listen(PORT, () => {
  connectDB(),
  logger(module).error(`⚡️[server]: Server is running at port ${PORT}`);
    console.log(`server is running on ${PORT}`)
})