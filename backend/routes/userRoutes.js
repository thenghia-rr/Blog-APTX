import express from "express";
const router = express.Router();
import { authGuard } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
} from "../controllers/UserController.js";

router.get('/all-users', getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
router.put("/update-profile", authGuard, updateProfile);
router.put("/update-profile-picture", authGuard, updateProfilePicture);

export default router;
