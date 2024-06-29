import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

// POST /api/comments
const createComment = async (req, res, next) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body;

    const post = await PostModel.findOne({ slug: slug });

    if (!post) {
      const error = new Error("Post not found");
      return next(error);
    }

    const newComment = new CommentModel({
      user: req.user._id,
      desc: desc,
      post: post._id,
      parent: parent,
      replyOnUser: replyOnUser,
    });

    const savedComment = await newComment.save();
    return res.json(savedComment);
  } catch (error) {
    next(error);
  }
};

// PUT /api/comments/:commentId
const updateComment = async (req, res, next) => {
  try {
    const { desc, check } = req.body;

    const comment = await CommentModel.findById(req.params.commentId);

    if (!comment) {
      const error = new Error("Comment not found");
      return next(error);
    }
    comment.desc = desc || comment.desc;
    comment.check = typeof check !== "undefined" ? check : comment.check;

    const updatedComment = await comment.save();
    return res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/comments/:commentId
const deleteComment = async (req, res, next) => {
  try {
    const comment = await CommentModel.findByIdAndDelete(req.params.commentId);
    // Delete replies comment if exists
    await CommentModel.deleteMany({ parent: comment._id });

    if (!comment) {
      const error = new Error("Comment not found");
      return next(error);
    }

    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// [GET] /api/comments
const getAllComments = async (req, res, next) => {
  try {
    const filter = req.query.search;
    let where = {};
    if (filter) {
      where.desc = { $regex: filter, $options: "i" }; // i => Không phân biệt hoa thường
    }

    let query = CommentModel.find(where); // KHông cần dùng await
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await CommentModel.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },
        {
          path: "parent",
          populate: [
            {
              path: "user",
              select: ["avatar", "name"],
            },
          ],
        },
        {
          path: "replyOnUser",
          select: ["avatar", "name"],
        },
        {
          path: "post",
          select: ["slug", "title"]
        }
      ])
      .sort({ updatedAt: "descending" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export { createComment, updateComment, deleteComment, getAllComments };
