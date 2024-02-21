import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import { createRoom, getChats, getUserRooms, joinRoom, leaveRoom, setChats } from "../controllers/roomController.js";

const router = express.Router()

router.route("/new").post(isAuthenticatedUser, createRoom);

router.route("/join").put(isAuthenticatedUser, joinRoom);

router.route("/userRooms").get(isAuthenticatedUser, getUserRooms);

router.route("/leaveRoom/:roomId").get(isAuthenticatedUser, leaveRoom);

router.route("/chats/:roomId").put(isAuthenticatedUser, setChats).get(isAuthenticatedUser, getChats);

export default router;
