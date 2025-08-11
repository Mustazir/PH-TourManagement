import {  Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleWires/validateRequest";
import { createUserZodSchema } from "./user.validate";
import { checkAuth } from "../../middleWires/checkAuth";
import { Role } from "./user.interface";



const router = Router();


router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
router.get("/all-users",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),UserController.getAllUsers);

export const userRoutes = router;
