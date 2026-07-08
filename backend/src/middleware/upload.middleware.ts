import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 100 * 1024 * 1024,
  },

  fileFilter(req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(
        new Error("Only PDF files are allowed.")
      );
    }

    cb(null, true);
  },
});