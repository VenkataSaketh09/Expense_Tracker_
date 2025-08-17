import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserProfile,
  updateUserPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
const authRoutes = Router();
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/getUser", protect, getUserInfo);
authRoutes.put("/update-profile", protect, updateUserProfile);
authRoutes.put("/update-password", protect, updateUserPassword);

authRoutes.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No File Uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});
export { authRoutes };
