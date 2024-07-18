import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
import { v4 as uuidv4 } from "uuid";
import uploadCloud from "../config/multer.config.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

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
    const postUpdate = await PostModel.findOne({ slug: req.params.slug });

    if (!postUpdate) {
      const error = new Error("Post not found");
      next(error);
      return;
    }

    const upload = uploadCloud.single("postPicture");

    // Method update post (no image)
    const handleUpdatePostData = async (data) => {
      // Kiểm tra nếu req.body.document là undefined hoặc null
      // Note: Test postman thì bắt buộc thêm field document (VD:{"title":"New title"})
      if (!data) {
        const error = new Error("Invalid JSON data");
        next(error);
        return;
      }

      try {
        const { title, caption, slug, body, tags, categories } =
          JSON.parse(data);

        postUpdate.title = title || postUpdate.title;
        postUpdate.caption = caption || postUpdate.caption;
        postUpdate.slug = slug || postUpdate.slug;
        postUpdate.body = body || postUpdate.body;
        postUpdate.tags = tags || postUpdate.tags;
        postUpdate.categories = categories || postUpdate.categories;

        const updatedPost = await postUpdate.save();

        return res.status(200).json({
          _id: updatedPost._id,
          title: updatedPost.title,
          caption: updatedPost.caption,
          slug: updatedPost.slug,
          body: updatedPost.body,
          tags: updatedPost.tags,
          categories: updatedPost.categories,
        });
      } catch (error) {
        next(error);
      }
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + " " + err.message
        );
        next(error);
      } else {
        if (req.file) {
          const result = await uploadToCloudinary(req.file);

          const oldPostImageId = postUpdate.photoId;

          postUpdate.photo = result.secure_url;
          postUpdate.photoId = result.public_id;
          await postUpdate.save();

          if (oldPostImageId) {
            await deleteFromCloudinary(oldPostImageId);
          }

          // console.log(`Req.Body.Document: ${req.body.document}`);
          await handleUpdatePostData(req.body.document);
        } else {
          const oldPostImageId = postUpdate.photoId;

          postUpdate.photo = "";
          postUpdate.photoId = "";

          if (oldPostImageId) {
            await deleteFromCloudinary(oldPostImageId);
          }

          await handleUpdatePostData(req.body.document);
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

    await CommentModel.deleteMany({ post: post._id });

    // Remove photo if exist
    if (post.photoId) {
      await deleteFromCloudinary(post.photoId);
    }

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// [DELETE /api/posts/delete-image/:slug
const deletePostImage = async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await PostModel.findOne({ slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Xóa ảnh từ Cloudinary
    // const publicId = post.photo.split('/').pop().split('.')[0]; // Lấy public_id của ảnh từ URL
    if (post.photoId) {
      await deleteFromCloudinary(post.photoId);
    }

    // Xóa đường dẫn ảnh từ cơ sở dữ liệu
    post.photo = "";
    post.photoId = "";
    await post.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// GET /api/posts
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
          select: ["title"],
        },
      ])
      .sort({ updatedAt: "descending" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

// PUT /api/posts/save/:postId
const savePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId).populate({
      path: "user",
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.savedBy.includes(req.user._id)) {
      return res.status(400).json({ message: "Post already saved" });
    }

    post.savedBy.push(req.user._id);
    await post.save();

    // Populate savedBy field to return updated user info
    const updatedPost = await PostModel.findById(req.params.postId).populate({
      path: "savedBy",
    });

    res
      .status(200)
      .json({ message: "Post saved successfully", post: updatedPost });
  } catch (error) {
    next(error);
  }
};

// PUT /api/posts/unsave/:postId
const unsavePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId).populate({
      path: "user",
    });

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.savedBy.includes(req.user._id)) {
      return res.status(400).json({ message: "Post not saved" });
    }

    post.savedBy = post.savedBy.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );
    await post.save();

    // Populate savedBy field to return updated user info
    const updatedPost = await PostModel.findById(req.params.postId).populate({
      path: "savedBy",
    });

    res
      .status(200)
      .json({ message: "Post unsaved successfully", post: updatedPost });
  } catch (error) {
    next(error);
  }
};

// GET /api/posts/saved
const getSavedPosts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // console.log("User ID:", userId); // Thêm log để kiểm tra user ID

    const savedPosts = await PostModel.find({ savedBy: userId }).populate([
      {
        path: "user",
        select: ["avatar", "avatarId", "name", "verified"], // lấy các field cần để hiển thị UI 
      },
    ]);

    if (!savedPosts || savedPosts.length === 0) {
      return res.status(404).json({ message: "No saved posts found" });
    }

    res.status(200).json(savedPosts);
  } catch (error) {
    next(error);
  }
};

export {
  createPost,
  updatePost,
  deletePost,
  getDetailPost,
  getAllPosts,
  deletePostImage,
  savePost,
  unsavePost,
  getSavedPosts,
};
