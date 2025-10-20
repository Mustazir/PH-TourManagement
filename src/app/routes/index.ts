import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DivisionRoutes } from "../modules/division/division.routes";
import { TourRoutes } from "../modules/tour/tour.route";
import { BookingRoutes } from "../modules/booking/booking.route";


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
    },
    {
        path:"/tour",
        route: TourRoutes
    },

    {
        path:"/booking",
        route: BookingRoutes
    }
]

moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})

