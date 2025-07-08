import express from "express";
const router = express.Router();


import { authAdmin, authGuard } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
  deleteUser,
  // forgotPassword,
  // resetPassword,
  showResetPasswordPage,
} from "../controllers/UserController.js";

router.get("/", authGuard, authAdmin, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

// router.post("/reset-password/:resetToken", resetPassword);
// router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:resetToken", showResetPasswordPage);


router.get("/me/profile", authGuard, userProfile);
router.put("/update-profile/:userId", authGuard, updateProfile);
router.put("/update-profile-picture", authGuard, updateProfilePicture);
router.delete("/:userId", authGuard, authAdmin, deleteUser);

export default router;
