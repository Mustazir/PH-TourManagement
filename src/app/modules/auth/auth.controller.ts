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

export const AuthControllers={
    credentialLogin
}