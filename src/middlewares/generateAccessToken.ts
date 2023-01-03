import jwt from "jsonwebtoken";
import logger from "../utils/logger";

let { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;

export interface JWTPayloadArgType {
  id: string;
  phoneNumber: string;
}

const AccessToken = async (user: JWTPayloadArgType) => {
  const payload = {
    id: user.id,
    phoneNumber: user.phoneNumber,
    time: new Date(),
  };
  if(!JWT_SECRET_KEY) JWT_SECRET_KEY = "secret";
  logger(module).info(JSON.stringify({ JWT_SECRET_KEY, JWT_EXPIRES_IN }));
  const token = jwt.sign(payload, <string>JWT_SECRET_KEY);

  return token;
};

export default AccessToken;
