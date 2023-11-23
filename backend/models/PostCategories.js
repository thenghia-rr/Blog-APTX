import { model, Schema } from "mongoose";

const PostCategoriesSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const PostCategoriesModel = model("PostCategories", PostCategoriesSchema);
export default PostCategoriesModel;