import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
const createUser = async (payload: Partial<IUser>) => {
  const {  email,...rest } = payload;

  const isUserExist =await User.findOne({email})

  if(isUserExist){
    throw new AppError(httpStatus.BAD_REQUEST,"User Already Exist")
  }

  const authProvider :IAuthProvider ={provider:"CREDENTIALS",providerId:email as string}
  const user = await User.create({
    email,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUser = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUser
    },
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
};
