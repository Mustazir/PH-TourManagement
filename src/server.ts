import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
import { th } from "zod/v4/locales/index.cjs";
dotenv.config();

let server: Server;

const startServer = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    server = app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
startServer();

process.on("unhandledRejection", () => {
  console.log(
    "unhandledRejection detected, shutting down the server gracefully........"
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("uncaughtException", () => {
  console.log(
    "unhandledRejection detected, shutting down the server gracefully........"
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGTERM", () => {
  console.log(
    "SIGTERM signal recieved, shutting down the server gracefully........"
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});



// unhandled promise rejections
// Promise.reject(new Error("I forgot to handle this promise rejection!"));

// uncaught exception

// throw new Error("I forgot to handle this exception!");

/**
 *
 * ----this error hapend on a server side----
 * unhandledRejection event handler
 * uncaught rejection event handler
 * signal termination /sigterm
 */
