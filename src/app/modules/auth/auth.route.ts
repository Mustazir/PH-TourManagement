import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middleWires/checkAuth";
import { Role } from "../user/user.interface";


const router =Router()

router.post("/login",AuthControllers.credentialLogin)
router.post("/refresh-token",AuthControllers.getNewAccessToken  )
router.post("/logout",AuthControllers.logOut  )
router.post("/reset-password",checkAuth(...Object.values(Role)),AuthControllers.resetPassword  )


export const AuthRoutes = router;