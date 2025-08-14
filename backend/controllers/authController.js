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

export { registerUser, loginUser, getUserInfo };
