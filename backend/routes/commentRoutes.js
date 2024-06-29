import express from "express";
const router = express.Router();
import { authAdmin, authGuard } from "../middleware/authMiddleware.js";
import {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
} from "../controllers/CommentControllers.js";

router
  .route("/")
  .post(authGuard, createComment)
  .get(authGuard, authAdmin, getAllComments);
router
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

export default router;
