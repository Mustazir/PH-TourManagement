import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  MONGODB_URI: string;
  PORT: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES: string;
  BCRYPT_SALT_ROUND: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  GOOLGE_CLIENT_SECRET:string;
  GOOGLE_CLIENT_ID:string;
  GOOGLE_CALLBACK_URL:string;
  EXPRESS_SESSION:string;
  FRONTEND_URL:string;

}

const loadEnvVarriables = (): EnvConfig => {
  const requiredEnvVarriables: string[] = [
    "MONGODB_URI",
    "PORT",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES",
    "BCRYPT_SALT_ROUND",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
    "GOOLGE_CLIENT_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CALLBACK_URL",
    "EXPRESS_SESSION",
    "FRONTEND_URL",
  ];
  requiredEnvVarriables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require Environment variable ${key} `);
    }
  });
  return {
    MONGODB_URI: process.env.MONGODB_URI as string,
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    GOOLGE_CLIENT_SECRET: process.env.GOOLGE_CLIENT_SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    EXPRESS_SESSION: process.env.EXPRESS_SESSION as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string  
  };
};
export const envVars: EnvConfig = loadEnvVarriables();
