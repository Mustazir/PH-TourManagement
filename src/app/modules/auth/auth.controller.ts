/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsnc";
import { sendResponse } from "../../utils/sendResponde";
import  httpStatus from 'http-status-codes';
import { AuthServices } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";

const credentialLogin = catchAsync(async (req: Request, res: Response,next:NextFunction) =>{
    const loginInfo =await AuthServices.credentialLogin(req.body)

    // res.cookie("accesToken",loginInfo.accessToken,{
    //   httpOnly:true,
    //   secure:false
    // })
    // res.cookie("refreshToken",loginInfo.refreshToken,{
    //   httpOnly:true,
    //   secure:false
    // })

    setAuthCookie(res,loginInfo)


    sendResponse(res,{
      statusCode:httpStatus.CREATED,
      success:true,
      message:"User LoogedIn successfully",
      data: loginInfo,
    })
})
const getNewAccessToken = catchAsync(async (req: Request, res: Response,next:NextFunction) =>{
  const refreshToken = req.cookies.refreshToken
    const tokenInfo = await AuthServices.getNewAccesToken(refreshToken as string);


    // res.cookie("accesToken",tokenInfo.accessToken,{
    //   httpOnly:true,
    //   secure:false
    // })

    setAuthCookie(res, tokenInfo);


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