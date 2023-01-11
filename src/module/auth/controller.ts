// import { Response } from "express";
// import dotenv from "dotenv";
// import bcrypt from "bcrypt";
// import handleResponse from "../../middlewares/response";
// import { MESSAGES } from "../../constants";
// import logger from "../../utils/logger";
// import { IGetUserAuthInfoRequest } from "../../../types/express";
// import UserService from "../user/service";
// import { UserInput } from "../../database/models/User";
// import AccessToken from "../../middlewares/generateAccessToken";
// const { BRCYPT_SALT, NODE_ENV, OTP_EXPIRES_IN } = process.env;
// class AuthController {
//     static async signUp(req: IGetUserAuthInfoRequest, res: Response){
//         try {
//             const {firstname, username, lastname, email, phoneNumber, password, confPassword, dob } = req.body

//             const query: Object = {
//                 $or: [
//                 {
//                     phoneNumber: new RegExp(
//                     phoneNumber.substring(phoneNumber.length - 10),
//                     "i"
//                     ),
//                 },
//                 { email: email.toLowerCase() },
//                 ],
//             };
//             if(password !== confPassword)
//                 return handleResponse(
//                 req,
//                 res,
//                 {
//                     status: "error",
//                     message: "password did not match",
//                 },
//                 400
//                 );
//             let findUser = await UserService.findUser(query);
//             if (findUser)
//                 return handleResponse(
//                 req,
//                 res,
//                 {
//                     status: "error",
//                     message: "The phone number or email exists for another user",
//                 },
//                 400
//                 );
//                 const hashedPassword = await bcrypt.hash(password.toString(), Number(BRCYPT_SALT));

//                 const userInput = {
//                     firstname,
//                     lastname,
//                     username,
//                     password: hashedPassword,
//                     phoneNumber: phoneNumber
//                     .replace(/\s+/g, "")
//                     .replace(/[{()}]/g, "")
//                     .replace(/[-]/g, ""),
//                     email: email.toLowerCase(),
//                     dob,
//                 };
            
//             let user = await UserService.storeUser(userInput);
//             const accessToken = await AccessToken({
//                 id: user.id,
//                 phoneNumber: user.phoneNumber,
//             });
//             user = await UserService.updateUser(user, { accessToken });
//             return handleResponse(
//                 req,
//                 res,
//                 {
//                 status: "success",
//                 message: "Sign up was successful",
//                 data: {
//                     user: {
//                     username: user?.username,
//                     firstname: user?.firstname,
//                     lastname: user?.lastname,
//                     id: user?.id,
//                     phoneNumber: user?.phoneNumber,
//                     },
//                     accessToken,
//                 },
//                 },
//                 201
//             );
//         } catch (error: any) {
//           logger(module).info(
//             `${500} - ${req.method} - ${req.socket.remoteAddress}- ${
//               req.originalUrl
//             } - ${error.message}`
//           );
//           console.log(error);
//           return handleResponse(
//             req,
//             res,
//             {
//               status: "error",
//               message: MESSAGES.STATUS500,
//             },
//             500
//           );
//         }
//       }

//       static async login(req: IGetUserAuthInfoRequest, res:Response){
//         try {
//             const {phoneNumber, password} = req.body
//             let user = await UserService.findUser({
//                 phoneNumber: new RegExp(
//                     phoneNumber.substring(phoneNumber.length - 10),
//                     "i"
//                   ),
//                 });
//                 if (!user)
//                   return handleResponse(
//                     req,
//                     res,
//                     { status: "error", message: "Username or pin is incorrect" },
//                     401
//                   );
//                   if (user.isDeleted)
//                         return handleResponse(
//                         req,
//                         res,
//                         { status: "error", message: "Account does not exist" },
//                         400
//                     );

//                 const isPasswordCorrect = bcrypt.compareSync(password, user.password);
//                 if (!isPasswordCorrect)
//                     return handleResponse(
//                     req,
//                     res,
//                     { status: "error", message: "Username or password is incorrect" },
//                     401
//                     );
//                     const accessToken = await AccessToken({
//                         id: user.id,
//                         phoneNumber: user.phoneNumber,
//                       });
//                       user = await UserService.updateUser(user, { accessToken });
                
//                       return handleResponse(
//                         req,
//                         res,
//                         {
//                           status: "success",
//                           message: "User signed in successfully",
//                           data: {
//                             user: {
//                               firstname: user?.firstname,
//                               lastname: user?.lastname,
//                               id: user?.id,
//                               phoneNumber: user?.phoneNumber,
//                               email: user?.email,
//                             },
//                             accessToken,
//                           },
//                         },
//                         200
//                       );
//         } catch (error: any) {
//             console.log(error);
//         logger(module).info(
//             `${500} - ${req.method} - ${req.socket.remoteAddress}- ${
//             req.originalUrl
//             } - ${error.message}`
//         );
//         return handleResponse(
//             req,
//             res,
//             { status: "error", message: MESSAGES.STATUS500 },
//             500
//         );
//         }
//       }

//     static async sendOtp(req: IGetUserAuthInfoRequest, res: Response){
//         try {
//             const { email } = req.body
//             let user = await UserService.findUser(email);
//             if(!user){
//                 return handleResponse(
//                     req,
//                     res,
//                     { status: "error", message: "Users does not exist" },
//                     404
//                   );
//             }
//         } catch (error: any) {
            
//         }
//     }
// }

// export default AuthController;