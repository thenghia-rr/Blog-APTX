import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
import { v4 as uuidv4 } from "uuid";
import { fileRemover } from "../utils/fileRemover.js";

// POST /api/posts/
const createPost = async (req, res, next) => {
  try {
    const post = new PostModel({
      title: "Test title",
      caption: "Test caption",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });

    const createdPost = await post.save();
    return res.status(201).json(createdPost);
  } catch (error) {
    next(error);
  }
};

// PUT /api/posts/:slug
const updatePost = async (req, res, next) => {
  try {
    const post = await PostModel.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post not found");
      next(error);
      return;
    }

    const upload = uploadPicture.single("postPicture");

    const handleUpdatePostData = async (data) => {
      // Kiểm tra nếu req.body.document là undefined hoặc null
      // Note: Test postman thì bắt buộc thêm field document (VD:{"title":"New title"})
      if (!data) {
        const error = new Error("Invalid JSON data");
        next(error);
        return;
      }
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;
      const updatedPost = await post.save();
      return res.json(updatedPost);
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + " " + err.message
        );
        next(error);
      } else {
        if (req.file) {
          let filename;
          filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
          handleUpdatePostData(req.body.document);
        } else {
          let filename;
          filename = post.photo;
          post.photo = "";
          fileRemover(filename);
          handleUpdatePostData(req.body.document);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/posts/:slug
const deletePost = async (req, res, next) => {
  try {
    const post = await PostModel.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post Not Found");
      return next(error);
    }

    fileRemover(post.photo);
    await CommentModel.deleteMany({ post: post._id });

    // Remove photo if exist
    let filename;
    filename = post.photo;
    if (filename) {
      fileRemover(filename);
    }

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/posts/:slug
const getDetailPost = async (req, res, next) => {
  try {
    const post = await PostModel.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "categories",
        select: ["title"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"],
              },
            ],
          },
        ],
      },
    ]);

    if (!post) {
      const error = new Error("Post Not Found");
      return next(error);
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

// GET /api/posts/
const getAllPosts = async (req, res, next) => {
  try {
    const filter = req.query.search;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" }; // i => Không phân biệt hoa thường
    }

    let query = PostModel.find(where); // KHông cần dùng await
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await PostModel.find(where).countDocuments();
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
          path: "categories",
          select: ["title"]
        }
      ])
      .sort({ updatedAt: "descending" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};
export { createPost, updatePost, deletePost, getDetailPost, getAllPosts };
