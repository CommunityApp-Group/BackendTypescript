import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest } from "../../types/express";
import { MESSAGES } from "../constants";
import DeviceService from "../services/device";
import logger from "../utils/logger";
import handleResponse from "./response";
const validateUserDevice = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.headers["x-device-data"] ||
      typeof req.headers["x-device-data"] !== "string"
    ) {
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "x-device-data is missing in the header",
        },
        401
      );
    }
    let xDeviceData = null;
    try {
      xDeviceData = JSON.parse(req.headers["x-device-data"]);
    } catch (error) {
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "Incorrect format for x-device-data",
        },
        401
      );
    }

    if (!xDeviceData) {
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "x-device-data is missing in the header",
        },
        401
      );
    }
    const imei = xDeviceData.imei;
    if (!imei)
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "Device imei is missing in the x-device-data header",
        },
        401
      );
    req.xDeviceData = xDeviceData;
    if (req.originalUrl.includes("auth")) {
      return next();
    }
    const findDevice = await DeviceService.findDevice({ imei });
    if (!findDevice)
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "This device is not registered",
        },
        401
      );

    if (findDevice.userId.toString() !== req.user?._id.toString())
      return handleResponse(
        req,
        res,
        {
          status: "error",
          message: "This device is not registered for this user",
        },
        401
      );
    return next();
  } catch (error: any) {
    console.log(error);
    logger(module).info(
      `${500} - ${req.method} - ${req.socket.remoteAddress}- ${
        req.originalUrl
      } - ${error.message}`
    );
    return handleResponse(
      req,
      res,
      { status: "error", message: MESSAGES.STATUS500 },
      500
    );
  }
};

export default validateUserDevice;
