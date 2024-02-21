import express from "express";
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/new").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/:userId").get(getUser);

export default router;
