import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import * as url from "url";
import passport from "passport";
import session from 'express-session';

// Config passport (Auth google)
import './utils/passport.js'

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

// Sessions - sử dụng bộ nhớ của server để lưu trữ phiên
app.use(
  session({
    secret: 'secret', // Bạn có thể thay đổi secret này
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Add headers to fix Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Static assets (Middleware static of Express.js)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Render home page
app.get("/", (req, res) => {
  // res.send("Server Blog-APTX is running...");
  res.sendFile(path.join(__dirname, 'views', 'home.html'))
});

// Apply Routes
routes(app);

// Apply middleware handle invalid path
app.use(errorInvalidPath);

// Apply middleware handle Error
app.use(errorResponseHandler);

// Connect to MongoDB
connectDB();
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
