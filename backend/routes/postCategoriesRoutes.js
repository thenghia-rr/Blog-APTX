import express from "express";
const router = express.Router();
import {
  createPostCategories,
  getAllPostCategories,
  updatePostCategories,
  deletePostCategories
} from "../controllers/PostCategoriesControllers.js";
import { authGuard, authAdmin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(authGuard, authAdmin, createPostCategories)
  .get(getAllPostCategories);

router
  .route("/:postCategoryId")
  .put(authGuard, authAdmin, updatePostCategories)
  .delete(authGuard, authAdmin, deletePostCategories);


export default router;
