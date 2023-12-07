import PostCategoriesModel from "../models/PostCategories.js";
import PostModel from "../models/Post.js";

// POST /api/posts-categories
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

// GET /api/posts-categories
const getAllPostCategories = async (req, res, next) => {
  try {
    const postCategories = await PostCategoriesModel.find({});

    return res.json(postCategories);
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

    await PostCategoriesModel.deleteOne({_id: categoryId})

    return res.json({
      message: 'Post Category deleted successfully '
    })

  } catch (error) {
    next(error);
  }
};
export { createPostCategories, getAllPostCategories, updatePostCategories, deletePostCategories };
