import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserProfile,
  updateUserPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const authRoutes = Router();
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/getUser", protect, getUserInfo);
authRoutes.put("/update-profile", protect, updateUserProfile);
authRoutes.put("/update-password", protect, updateUserPassword);

export { authRoutes };
