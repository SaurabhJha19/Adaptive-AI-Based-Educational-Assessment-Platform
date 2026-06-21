import { Router }
from "express";

import {
  getTopicPerformance,
} from "../controllers/topic-performance.controller";

const router =
  Router();

router.get(
  "/",
  getTopicPerformance
);

export default router;