import dotenv from "dotenv";
dotenv.config();


interface EnvConfig{
    MONGODB_URI: string;
    PORT: string;
    NODE_ENV: "development" | "production" ;
}

const loadEnvVarriables =() : EnvConfig =>{

    const requiredEnvVarriables :string[] =["MONGODB_URI", "PORT", "NODE_ENV"];
    requiredEnvVarriables.forEach(key=>{
        if(!process.env[key]){
            throw new Error(`Missing require Environment variable ${key} `);
        }
    })
    return{
        MONGODB_URI: process.env.MONGODB_URI as string,
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production"
    }
}
export const envVars:EnvConfig= loadEnvVarriables();