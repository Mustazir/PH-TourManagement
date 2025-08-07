import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleWires/validateRequest";
import { createUserZodSchema } from "./user.validate";


const router =Router();

router.post("/register",validateRequest(createUserZodSchema), UserController.createUser)
router.get("/all-users",UserController.getAllUsers)

export const userRoutes = router;