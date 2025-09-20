/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

import { envVars } from "../config/env";
import { stat } from "fs";
import { object } from "zod";
import path from "path";

export const globalErrorHandler = (err:any,req: Request,res: Response,next: NextFunction) => {
    let statusCode=500;
    let message=` ${err.message}`;
    const errorSources:any=[];


    // Duplicate user error
    if(err.code===11000){
        const matchedArray=err.message.match(/"([^"]*)"/);
        statusCode=400;
        message=`${matchedArray[1]} already exists`;
    }
    // Cast error
    else if(err.name==="CastError"){
        statusCode=400;
        message="invalid Mongoose ObjectId.Please provide a valid id";
    }
    else if(err.name==="ValidationError"){
        statusCode=400;
        const errors= Object.values(err.errors)
        errors.forEach((errorObject:any)=>errorSources.push({
            path:errorObject.path,
            message:errorObject.message,
        }))
        message="Validation error";
    }

    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack:envVars.NODE_ENV === "development" ? err.stack : null,
    })
};
