import express, { Request, Response } from "express";
import { userRoutes } from "./app/modules/user/user.route";
import cors from "cors";
const app=express()

app.use(express.json())

app.use(cors())
app.use("/api/v1/users",userRoutes )

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        message: "Welcome to the Ph-Tour Management API"
    });
})
export default app;