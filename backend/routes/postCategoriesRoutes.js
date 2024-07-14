import express from "express";
const router = express.Router();
import {
  createPostCategories,
  getAllPostCategories,
  getSingleCategory,
  updatePostCategories,
  deletePostCategories,
  getAllPostCategoriesNoFilter,
} from "../controllers/PostCategoriesControllers.js";
import { authGuard, authAdmin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(authGuard, authAdmin, createPostCategories)
  .get(getAllPostCategories);

router.route("/no-filter").get(getAllPostCategoriesNoFilter);

router
  .route("/:postCategoryId")
  .put(authGuard, authAdmin, updatePostCategories)
  .delete(authGuard, authAdmin, deletePostCategories)
  .get(getSingleCategory);

export default router;
