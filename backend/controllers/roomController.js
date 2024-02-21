import Room from "../models/roomModel.js";
import User from "../models/userModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const createRoom = catchAsyncErrors(async (req, res) => {
  const user = req.user;
  //   console.log(userId);
  const { roomName } = req.body;
  const room = await Room.create({
    roomName,
  });

  room.users.push(user);
  await room.save();

  user.rooms.push(room);
  await user.save();

  res.status(201).json({
    success: true,
    room,
  });
});

export const joinRoom = catchAsyncErrors(async (req, res) => {
  const user = req.user;
  const roomName = req.body.roomName;
  const room = await Room.findOne({ roomName });
  room.users.push(user);
  await room.save();

  user.rooms.push(room);
  await user.save();

  res.status(200).json({
    success: true,
    room,
  });
});

export const getUserRooms = catchAsyncErrors(async (req, res) => {
  const user = req.user;

  const rooms = [];
  for (let roomId of user.rooms) {
    const room = await Room.findById(roomId);
    rooms.push({
      id: roomId,
      name: room.roomName
    });
  }

  res.status(200).send({
    success: true,
    rooms: rooms,
  });
});

export const leaveRoom = catchAsyncErrors(async (req, res) => {
  const userId = req.user.id;
  const roomId = req.params.roomId;
  console.log(req.params.roomId);
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { rooms: roomId } },
    { new: true }
  );

  const room = await Room.findByIdAndUpdate(
    roomId,
    { $pull: { users: userId } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    user,
    room,
  });
});

export const getChats = async (req, res) => {
  const roomId = req.params.roomId;
  const room = await Room.findById(roomId);
  const chats = room.chats;
  res.status(200).json({
    success: true,
    chats
  });
};

export const setChats = async (req, res) => {
  const roomId = req.params.roomId;
  const room = await Room.findByIdAndUpdate(
    roomId,
    {
      $push: { chats: { sender: req.user.id, message: "Hello" } },
    },
    { new: true }
  );
  res.status(200).json({
    success: true,
    room
  });
};
