import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
//generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  const { userName, email, password, profileImageUrl } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({ message: "Fill required fields" });
  }
  try {
    //check if email already exists
    const checkingEmail = await User.findOne({ email });
    if (checkingEmail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    //create the user
    const user = await User.create({
      userName,
      email,
      password,
      profileImageUrl,
    });
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error" + err.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Provide required fields" });
  }
  try {
    const user = await User.findOne({ email });
    const isMatch = await user.comparePassword(password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server Error" + err.message });
  }
};
const getUserInfo = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  try {
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server Error" + err.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { userName, email, profileImageUrl } = req.body;

    // Validate input
    if (!userName || !email) {
      return res
        .status(400)
        .json({ message: "Username and email are required" });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({
      email,
      _id: { $ne: userId },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        userName,
        email,
        profileImageUrl,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error: " + err.message,
    });
  }
};

// Update user password
const updateUserPassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });
    }

    // Get user with password
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error: " + err.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserProfile,
  updateUserPassword,
};
