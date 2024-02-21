import express from "express";
import UserRouter from "./routes/userRoute.js";
import RoomRouter from "./routes/roomRoute.js";
import cookieParser from "cookie-parser";

export default function initHttp(app) {
  app.use(express.json());
  app.use(cookieParser());
  
  app.use("/api/v1/users", UserRouter);
  app.use("/api/v1/rooms", RoomRouter);
}
