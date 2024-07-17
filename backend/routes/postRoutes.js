import express from "express";
const router = express.Router();
import { authGuard, authAdmin } from "../middleware/authMiddleware.js";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getDetailPost,
  deletePostImage,
} from "../controllers/PostControllers.js";

router.route("/").post(authGuard, authAdmin, createPost).get(getAllPosts);
router
  .route("/:slug")
  .put(authGuard, authAdmin, updatePost)
  .delete(authGuard, authAdmin, deletePost)
  .get(getDetailPost);

router.delete("/delete-image/:slug", authGuard, authAdmin, deletePostImage);

export default router;
