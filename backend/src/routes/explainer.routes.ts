import { Router }
from "express";

import {
  authenticate,
} from "../middleware/auth.middleware";

import {
  askExplainer,
} from "../controllers/explainer.controller";

const router =
  Router();

router.post(
  "/ask",
  authenticate,
  askExplainer
);

export default router;