import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus  from 'http-status-codes';
import bcryptjs from 'bcryptjs';
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

  return {
    email:isUserExist.email
  }
};


export const AuthServices = {
  credentialLogin,
};
