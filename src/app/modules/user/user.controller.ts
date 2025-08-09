
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes";
import { UserServices } from "./user.services";
import { catchAsync } from "../../utils/catchAsnc";
import { success } from "zod";
import { sendResponse } from "../../utils/sendResponde";



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

export const UserController = { createUser ,getAllUsers};





// -----Working Flow-----
// routes matching-> controller->services->model->DB


// but first need to create model->create service->controller->route
