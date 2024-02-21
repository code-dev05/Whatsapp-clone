import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.decode(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedData.id);

  if (!user) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  req.user = user;

  next();
};