import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://todosexpress:todosexpress@cluster0.w81iv.mongodb.net/Ph-Tour-Management?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
    server=app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
startServer();


process.on("unhandledRejection",()=>{
    console.log("unhandledRejection detected, shutting down the server gracefully........");
    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }

})


/**
 *
 * ----this error hapend on a server side----
 * unhandledRejection event handler
 * uncaught rejection event handler
 * signal termination /sigterm
 */
