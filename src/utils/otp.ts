import moment from "moment";
import { OTPSTATUS } from "../constants";
import AuthService from "../module/auth/service";
import logger from "./logger";

export const generateOTP = (length = 6) => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

export const validateOTP = async (
  otp: string,
  phoneNumber: string
): Promise<{ status: string; message: string }> => {
  try {
    const userOtp = await AuthService.findUserOtp(phoneNumber);
    if (!userOtp) {
      throw { message: "There is no OTP created for this user" };
    }
    if (userOtp.token !== otp) {
      throw { message: "OTP mismatch. Please crosscheck the OTP sent to you" };
    }
    if (userOtp.status === OTPSTATUS.EXPIRED) {
      throw { message: "OTP has expired" };
    }
    if (userOtp.status === OTPSTATUS.USED) {
      throw { message: "OTP has been used already" };
    }
    const hasExpired =
      moment().format("YYYY-MM-DD H:m:s") >
      moment(userOtp.expireAt).format("YYYY-MM-DD H:m:s");
    if (hasExpired) {
      await AuthService.updateOtp(userOtp, { status: OTPSTATUS.EXPIRED });
      throw { message: "Your OTP has expired. Please request for another one" };
    }
    await AuthService.updateOtp(userOtp, { status: OTPSTATUS.USED });
    logger(module).info(
      `OTP validated successfully - ${phoneNumber} - ${otp}`
    );
    return { status: "success", message: "OTP validated" };
  } catch (e: any) {
    logger(module).error(`Failed to validate otp ${e?.message || e}`);
    return {
      status: "error",
      message: e?.message || "An error occurred. Please try again",
    };
  }
};
