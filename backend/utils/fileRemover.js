import fs from "fs";
import path from "path";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const fileRemover = (filename) => {
  fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
    if (err && err.code == "ENOENT") {
      // file didn't exist
      console.log(`File ${filename} doesn't exist, won't remove it`);
    } else if (err) {
      console.log(err.message);
      console.log(`Error occurred while removing ${filename}`);
    } else {
      console.log(`Deleted ${filename}`);
    }
  });
};
