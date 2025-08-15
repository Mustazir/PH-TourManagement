import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middleWires/globalErrorHandler";
import notFound from "./app/middleWires/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expresssession from "express-session";


const app=express()

// middlewire for authentication google facebook/local here use passport js library

app.use(expresssession({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/v1",router )

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        message: "Welcome to the Ph-Tour Management API"
    });
})

// error handling middlewares
app.use(globalErrorHandler)

app.use(notFound)
export default app;