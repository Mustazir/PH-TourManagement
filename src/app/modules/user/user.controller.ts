import { Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes"

const createUser =async (req:Request,res:Response)=>{

    try {
        const {name ,email }= req.body

    const user =await User.create({name,email})

    res.status(httpStatus.CREATED).json({
        message: "user created successfully",
        user
    });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });

    }

}


export const UserController = {createUser}