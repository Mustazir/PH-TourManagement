import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleWires/validateRequest";
import { createUserZodSchema } from "./user.validate";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelper/AppError";
import { Role } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
router.get(
  "/all-users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No token Recieved");
      }
      const verifiedToken = jwt.verify(accessToken, "secrate");
      console.log(verifiedToken);

      console.log(verifiedToken)
    //   JWT Role
      if (
        (verifiedToken as JwtPayload).role !== Role.ADMIN ) {
        throw new AppError(403, "You are not Permitted to this route");
      }
      console.log(verifiedToken)

      next();
    } catch (error) {
      next(error);
    }
  },
  UserController.getAllUsers
);

export const userRoutes = router;
