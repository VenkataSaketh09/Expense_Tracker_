import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
const protect = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not Authorized, no token" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id).select("-password");
    next();
  } catch (err) {
    return res.json({ error: "Internal Server error" + err.message });
  }
};
export {protect}