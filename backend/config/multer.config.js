import multer from "multer";
import path from 'path';

const uploadCloud = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
    files: 1,
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

export default uploadCloud;
