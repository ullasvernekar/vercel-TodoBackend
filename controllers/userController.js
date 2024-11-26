import asyncHandler from "express-async-handler";
import User from "../schemas/userSchema.js";

export const createUser = asyncHandler(async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(404)
        .json({ success: false, msg: "user already exists" });
    }
    const user = await User.create({
      username,
      phone,
      email,
      password
    });

    return res
      .status(200)
      .json({ success: true, msg: "user created successfully", data: user });
  } catch (error) {
    return res.status(500).json({ suucess: false, msg: "server error", error });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "user deleted successfully", user });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "server error" });
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "user updated successfully", user });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "server error" });
  }
});

export const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "user found successfully", user });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "server error" });
  }
});

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ success: false, msg: "no users found" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "users found successfully", users });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "server error" });
  }
});
