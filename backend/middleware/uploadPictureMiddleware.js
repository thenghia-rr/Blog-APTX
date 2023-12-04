import multer from "multer";
import path from "path";

import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// const __filename = url.fileURLToPath(import.meta.url);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1000000, // 2MB
  },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".png" &&
      ext !== ".jpeg" &&
      ext !== ".webp"
    ) {
      return cb(
        new Error("File must be in the following format: PNG, JPG, JPEG")
      );
    }
    cb(null, true);
  },
});

export { uploadPicture };
