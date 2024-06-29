import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import * as url from "url";

// Routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import postCategoriesRoutes from "./routes/postCategoriesRoutes.js";

// Middleware
import {
  errorResponseHandler,
  errorInvalidPath,
} from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Middleware parse json and apply (req.body)
app.use(express.json());
app.use(cors());

// Static assets
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
connectDB();
app.get("/", (req, res) => {
  res.send("Server Blog-APTX is running...");
});

// Apply Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);

// Apply middleware handle Error
app.use(errorResponseHandler);
app.use(errorInvalidPath);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

// javascript: (function () {
//   var cover = document.createElement("div");
//   let css =
//     "position: fixed;\npointer-events: none;\ntop: 0;\nleft: 0;\nwidth: 100vw;\nheight: 100vh;\nbackground-color: white;\nmix-blend-mode: difference;\nz-index: 1;";
//   cover.setAttribute("style", css);
//   document.body.appendChild(cover);
// })();
