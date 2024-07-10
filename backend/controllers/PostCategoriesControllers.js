import PostCategoriesModel from "../models/PostCategories.js";
import PostModel from "../models/Post.js";

// POST /api/post-categories
const createPostCategories = async (req, res, next) => {
  try {
    const { title } = req.body;
    const postCategory = await PostCategoriesModel.findOne({ title });

    if (postCategory) {
      const error = new Error("This Category is already created!");
      return next(error);
    }

    const newCategory = new PostCategoriesModel({ title });

    const savedCategory = await newCategory.save();

    return res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

// GET /api/post-categories (Tạm bợ)
const getAllPostCategories = async (req, res, next) => {
  try {
    const filter = req.query.search;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" }; // i => Không phân biệt hoa thường
    }

    let query = PostCategoriesModel.find(where); // KHông cần dùng await
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await PostCategoriesModel.find(where).countDocuments();
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
      .sort({ updatedAt: "descending" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

// GET /api/post-categories/:postCategoryId
const getSingleCategory = async (req, res, next) => {
  try {
    const postCategory = await PostCategoriesModel.findById(
      req.params.postCategoryId
    );

    if (!postCategory) {
      res.status(404).json({
        message: "Post category not found",
      });
    }

    return res.json(postCategory);
  } catch (error) {
    next(error);
  }
};

// PUT /api/posts-categories/:postCategoryId
const updatePostCategories = async (req, res, next) => {
  try {
    const { title } = req.body;
    // const { id } = req.params.postCategoryId; Not working

    const postCategory = await PostCategoriesModel.findByIdAndUpdate(
      req.params.postCategoryId,
      {
        title,
      },
      {
        new: true,
      }
    );

    if (!postCategory) {
      const error = new Error("Category not found");
      return next(error);
    }

    return res.json(postCategory);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/post-categories/:postCategoryId
const deletePostCategories = async (req, res, next) => {
  try {
    const categoryId = req.params.postCategoryId;

    await PostModel.updateMany(
      { categories: { $in: [categoryId] } },
      { $pull: { categories: categoryId } }
    );

    await PostCategoriesModel.deleteOne({ _id: categoryId });

    return res.json({
      message: "Post Category deleted successfully ",
    });
  } catch (error) {
    next(error);
  }
};
export {
  createPostCategories,
  getAllPostCategories,
  getSingleCategory,
  updatePostCategories,
  deletePostCategories,
};
