import { Response }
from "express";

import {
  TopicPerformanceModel,
} from "../models/topic-performance.model";

export const getTopicPerformance =
  async (
    req: any,
    res: Response
  ) => {

    const topics =
      await TopicPerformanceModel
        .find()
        .sort({
          averageRating: -1,
        });

    res.status(200).json({
      success: true,
      topics,
    });
  };