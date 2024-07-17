import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import * as url from "url";

// Routes
import routes from "./routes/index.js";

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
app.use(
  cors({
    origin: ["http://localhost:4000"],
    optionsSuccessStatus: 200,
  })
);

// Static assets (Middleware static of Express.js)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
connectDB();
app.get("/", (req, res) => {
  res.send("Server Blog-APTX is running...");
});

// Apply Routes
routes(app);

// Apply middleware handle invalid path
app.use(errorInvalidPath);

// Apply middleware handle Error
app.use(errorResponseHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
