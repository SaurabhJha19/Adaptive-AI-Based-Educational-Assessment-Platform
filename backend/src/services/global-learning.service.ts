import {
  TopicPerformanceModel,
} from "../models/topic-performance.model";

import {
  QuestionModel,
} from "../models/question.model";

export const updateTopicPerformance =
  async (
    questionId: string,
    rating: number
  ) => {

    const question =
      await QuestionModel.findById(
        questionId
      );

    if (!question) {
      return;
    }

    const topic =
      question.topic ||
      "General";

    const existing =
      await TopicPerformanceModel.findOne({
        topic,
      });

    if (!existing) {

      await TopicPerformanceModel.create({
        topic,
        averageRating:
          rating,
        totalRatings: 1,
        totalQuestions: 1,
      });

      return;
    }

    const newAverage =
      (
        existing.averageRating *
          existing.totalRatings +
        rating
      ) /
      (
        existing.totalRatings +
        1
      );

    existing.averageRating =
      newAverage;

    existing.totalRatings += 1;

    await existing.save();
  };