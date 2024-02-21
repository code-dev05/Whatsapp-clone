import express from "express";
import cors from "cors";
import WebSocket from "ws";
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import initHttp from "./http.js";
import initWs from "./ws.js";

mongoose.connect(process.env.DB_URI);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === 'http://localhost:5173') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

const app = express();
app.use(cors(corsOptions));

const httpServer = createServer(app);

initHttp(app);
initWs(httpServer);

const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
