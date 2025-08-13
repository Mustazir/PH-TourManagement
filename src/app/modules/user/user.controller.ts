
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes";
import { UserServices } from "./user.services";
import { catchAsync } from "../../utils/catchAsnc";
import { success } from "zod";
import { sendResponse } from "../../utils/sendResponde";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";



const createUser = catchAsync(async (req: Request, res: Response,next:NextFunction) =>{
  const user = await UserServices.createUser(req.body);

    // res.status(httpStatus.CREATED).json({
    //   message: "user created successfully",
    //   user,
    // });

    sendResponse(res,{
      statusCode:httpStatus.CREATED,
      success:true,
      message:"user created successfully",
      data: user,
    })
})



const updateUser = catchAsync(async (req: Request, res: Response,next:NextFunction) =>{

  const userId=req.params.id
  // const token = req.headers.authorization
  // const verifiedToken= verifyToken(token as string,envVars.JWT_ACCESS_SECRET) as JwtPayload
// ---- use here custom tpe 

  const verifiedToken=req.user;
  const payload =req.body
  const user = await UserServices.updateUser(userId,payload,verifiedToken);

    // res.status(httpStatus.CREATED).json({
    //   message: "user created successfully",
    //   user,
    // });

    sendResponse(res,{
      statusCode:httpStatus.CREATED,
      success:true,
      message:"user updated successfully",
      data: user,
    })
})

const getAllUsers=catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
  const users= await UserServices.getAllUsers();




  // res.status(httpStatus.OK).json({
  //   success: true,
  //   message:"all users",
  //   users,
  // })

  sendResponse(res,{
      statusCode:httpStatus.CREATED,
      success:true,
      message:"user created successfully",
      data: users.data,
      meta: users.meta
    })
})

export const UserController = { createUser ,getAllUsers,updateUser};





// -----Working Flow-----
// routes matching-> controller->services->model->DB


// but first need to create model->create service->controller->route
