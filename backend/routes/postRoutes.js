import express from "express";
const router = express.Router();
import { authGuard, authAdmin, authAuthorVerified } from "../middleware/authMiddleware.js";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getDetailPost,
  deletePostImage,
} from "../controllers/PostControllers.js";

router.route("/").post(authGuard, authAuthorVerified, createPost).get(getAllPosts);
router
  .route("/:slug")
  .put(authGuard, authAuthorVerified, updatePost)
  .delete(authGuard, authAdmin, deletePost)
  .get(getDetailPost);

router.delete("/delete-image/:slug", authGuard, authAdmin, deletePostImage);

export default router;
