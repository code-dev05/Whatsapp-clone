import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Room from "../models/roomModel.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwt.js";

export const registerUser = catchAsyncErrors(async (req, res) => {
  const { name, password } = req.body;
  const newUser = new User({
    name,
    password,
  });
  const user = await newUser.save();
  sendToken(user, 201, res);
});

export const loginUser = catchAsyncErrors(async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (!user) {
    res.status(401).json({
      message: "Login not authorized",
    });
  }

  if (password !== user.password) {
    res.status(401).json({
      message: "Login not authorized",
    });
  }
  sendToken(user, 200, res);
});

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export const getUser = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
})