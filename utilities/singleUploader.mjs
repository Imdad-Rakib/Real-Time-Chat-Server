// external imports
import multer from "multer";
import { extname } from "path";
import createError from "http-errors";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function uploader(
  subfolder_path,
  max_file_size,
) {
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;
  console.log(UPLOADS_FOLDER);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
  });

  return upload;
}

export default uploader;
