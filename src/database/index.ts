import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();
const { NODE_ENV, DATABASE_URL, DATABASE_TEST_URL } = process.env;
const url = NODE_ENV === "test" ? DATABASE_TEST_URL || "" : DATABASE_URL || "";

const connectDB = () => {
  mongoose
    .connect(url)
    .then((result) =>
      logger(module).error(`⚡️[Database]: Database connection successful`)
    )
    .catch((err) => {
      console.log(err);
      logger(module).error(`Failed to connect to database: ${err.message}`);
      setTimeout(connectDB, 5000);
    });
};

export default connectDB;
