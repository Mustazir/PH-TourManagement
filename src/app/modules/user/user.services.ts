import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );
  const authProvider: IAuthProvider = {
    provider: "CREDENTIALS",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    auths: [authProvider],
    password: hashedPassword,
    ...rest,
  });
  return user;
};

const updateUser = async (userId: string,payload: Partial<IUser>,decodedToken: JwtPayload) => {

  const isUserExist = await User.findById(userId);
  if(!isUserExist){
    throw new AppError(
        httpStatus.NOT_FOUND,
        "No User Found"
      );
  }


  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not allowed to update role"
      );
    }
    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not allowed to update role"
      );
    }
  }
  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not allowed to update role"
      );
    }
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUND
    );
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return updatedUser;
};

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUser = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUser,
    },
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
  updateUser
};
