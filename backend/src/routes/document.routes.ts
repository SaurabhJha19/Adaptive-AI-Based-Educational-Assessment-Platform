import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../config/multer";
import { uploadDocument } from "../controllers/document.controller";
import { getDocuments } from "../controllers/document.controller";
import {deleteDocument} from "../controllers/document.controller";

const router = Router();

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  uploadDocument
);

router.get(
  "/",
  authenticate,
  getDocuments
);

router.delete(
  "/:id",
  authenticate,
  deleteDocument
);

export default router;