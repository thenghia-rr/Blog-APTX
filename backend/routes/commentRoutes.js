import express from "express";
const router = express.Router();
import { authGuard } from "../middleware/authMiddleware.js";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/CommentControllers.js";

router.post("/", authGuard, createComment);
router
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

export default router;
