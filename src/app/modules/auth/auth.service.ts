import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus  from 'http-status-codes';
import bcryptjs from 'bcryptjs';

import { envVars } from "../../config/env";
import { generateToken } from "../../utils/jwt";
const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email Does not Exist");
  }
  const isPasswordMatch =await bcryptjs.compare(password as string, isUserExist.password as string);

  if(!isPasswordMatch){
    throw new AppError(httpStatus.UNAUTHORIZED, "Password does not match");
  }

  const jswtPaload={
    userId:isUserExist._id,
    email:isUserExist.email,
    role :isUserExist.role
  }
  const accessToken =generateToken(jswtPaload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)


  return {
    accessToken
  }
};


export const AuthServices = {
  credentialLogin,
};
