import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleWires/validateRequest";
import { createUserZodSchema } from "./user.validate";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelper/AppError";
import { Role } from "./user.interface";
import { verifyToken } from "../../utils/jst";
import { envVars } from "../../config/env";

const router = Router();

const checkAuth =
  (...authRoles:string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No token Recieved");
      }
      const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET);

      console.log(verifiedToken);
      //   JWT Role
      if ((verifiedToken as JwtPayload).role !== Role.ADMIN) {
        throw new AppError(403, "You are not Permitted to this route");
      }
      console.log(verifiedToken);

      next();
    } catch (error) {
      next(error);
    }
  };
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
router.get("/all-users",checkAuth("ADMIN","SUPER_ADMIN"),UserController.getAllUsers);

export const userRoutes = router;
