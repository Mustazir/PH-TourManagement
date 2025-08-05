import { Request, Response } from "express";

import httpStatus from "http-status-codes";
import { UserServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "user created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const UserController = { createUser };





// -----Working Flow-----
// routes matching-> controller->services->model->DB


// but first need to create model->create service->controller->route
