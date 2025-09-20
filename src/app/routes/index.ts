import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DivisionRoutes } from "../modules/division/division.routes";


export const router =Router();

const moduleRoutes =[
    {
        path:"/users",
        route :userRoutes
    },
    {
        path:"/auth",
        route :AuthRoutes
    },
    {
        path:"/division",
        route:DivisionRoutes
    }
]

moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})

