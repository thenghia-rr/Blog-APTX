import express from "express";
const router = express.Router();
import { authGuard } from "../middleware/authMiddleware.js";
import {
 createComment,
 updateComment
} from "../controllers/CommentControllers.js";

router.post("/",authGuard, createComment);
router.put("/:commentId",authGuard, updateComment);



export default router;
