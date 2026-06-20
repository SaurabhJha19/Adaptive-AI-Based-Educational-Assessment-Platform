import { Router }
from "express";

import {
  authenticate,
} from "../middleware/auth.middleware";

import {
  getRecommendations,
} from "../controllers/recommendation.controller";

const router =
  Router();

router.get(
  "/",
  authenticate,
  getRecommendations
);

export default router;