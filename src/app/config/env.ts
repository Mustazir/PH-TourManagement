import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  MONGODB_URI: string;
  PORT: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  BCRYPT_SALT_ROUND: string;
}

const loadEnvVarriables = (): EnvConfig => {
  const requiredEnvVarriables: string[] = [
    "MONGODB_URI",
    "PORT",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES",
    "BCRYPT_SALT_ROUND",
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
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
  };
};
export const envVars: EnvConfig = loadEnvVarriables();
