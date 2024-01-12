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
  // allowed_file_types,
  max_file_size,
  // max_number_of_files,
  // error_msg
) {
  // File upload folder
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

  // define the storage
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

  // preapre the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    // fileFilter: (req, file, cb) => {
    //   if (req.files.length > max_number_of_files) {
    //     // throw new Error(`Maximum ${max_number_of_files} files are allowed to upload!`)
    //     cb(new Error(`Maximum ${max_number_of_files} files are allowed to upload!`));
    //   } else {
    //     // if (allowed_file_types.includes(file.mimetype)) {
    //       cb(null, true);
    //     // } else {
    //     //   cb(createError(error_msg));
    //     // }
    //   }
    // },
  });

  return upload;
}

export default uploader;
