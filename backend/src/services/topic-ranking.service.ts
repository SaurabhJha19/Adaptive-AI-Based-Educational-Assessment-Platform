import {
  TopicPerformanceModel,
} from "../models/topic-performance.model";

export const getTopTopics =
  async (
    limit = 5
  ) => {

    return TopicPerformanceModel
      .find()
      .sort({
        averageRating: -1,
      })
      .limit(limit);
  };