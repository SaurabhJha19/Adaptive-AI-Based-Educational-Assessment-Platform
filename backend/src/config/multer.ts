import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(
  process.cwd(),
  "uploads"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
    destination: (req: any, file, cb) => {
    const userId = req.user?.userId;

    if (!userId) {
        return cb(
        new Error("User not authenticated"),
        ""
        );
    }

    const userUploadDir = path.join(
        uploadDir,
        userId
    );

    if (!fs.existsSync(userUploadDir)) {
        fs.mkdirSync(userUploadDir, {
        recursive: true,
        });
    }

    cb(null, userUploadDir);
    },

  filename: (
    req,
    file,
    cb
  ) => {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      `${uniqueSuffix}-${file.originalname}`
    );
  },
});

export const upload = multer({
  storage,

  fileFilter: (
    req,
    file,
    cb
  ) => {
    if (
      file.mimetype ===
      "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF files are allowed"
        )
      );
    }
  },

  limits: {
    fileSize:
      10 * 1024 * 1024,
  },
});