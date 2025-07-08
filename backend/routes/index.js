// Routes
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoutes.js";
import postCategoriesRoutes from "./postCategoriesRoutes.js";
// import authRoutes from "./authRoutes.js";

function routes(app) {
  // app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/comments", commentRoutes);
  app.use("/api/post-categories", postCategoriesRoutes);
}

export default routes;
