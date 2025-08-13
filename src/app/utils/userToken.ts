//  -------- here create token for access token and refresh token --------

import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";



export const createUserTokens=(user :Partial<IUser>)=>{

  const jswtPaload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };
  const accessToken = generateToken(
    jswtPaload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );
  const refreshToken = generateToken(
    jswtPaload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );


  return {
    accessToken,
    refreshToken,
  }

}