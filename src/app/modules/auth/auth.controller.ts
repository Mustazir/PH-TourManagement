/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsnc";
import { sendResponse } from "../../utils/sendResponde";
import  httpStatus from 'http-status-codes';
import { AuthServices } from "./auth.service";

const credentialLogin = catchAsync(async (req: Request, res: Response,next:NextFunction) =>{
    const loginInfo =await AuthServices.credentialLogin(req.body)
    sendResponse(res,{
      statusCode:httpStatus.CREATED,
      success:true,
      message:"User LoogedIn successfully",
      data: loginInfo,
    })
})
const getNewAccessToken = catchAsync(async (req: Request, res: Response,next:NextFunction) =>{
  const refreshToken = req.headers.authorization
    const tokenInfo = await AuthServices.getNewAccesToken(refreshToken as string);
    sendResponse(res,{
      statusCode:httpStatus.CREATED,
      success:true,
      message:"User LoogedIn successfully",
      data: tokenInfo,
    })
})

export const AuthControllers={
    credentialLogin,
    getNewAccessToken
}