import {
  FeedbackModel,
} from "../models/feedback.model";

import {
  QuestionModel,
} from "../models/question.model";

import {
  updateTopicPerformance,
} from "./global-learning.service";

export const submitFeedback =
  async ({
    userId,
    questionId,
    rating,
    comment,
  }: {
    userId: string;
    questionId: string;
    rating: number;
    comment?: string;
  }) => {

    await FeedbackModel.create({
      userId,
      questionId,
      rating,
      comment,
    });

    const feedbacks =
      await FeedbackModel.find({
        questionId,
      });

    await updateTopicPerformance(
      questionId,
      rating
    );

    const average =
      feedbacks.reduce(
        (sum, item) =>
          sum + item.rating,
        0
      ) /
      feedbacks.length;

    await QuestionModel.findByIdAndUpdate(
      questionId,
      {
        averageRating:
          average,

        feedbackCount:
          feedbacks.length,
      }
    );

    return {
      averageRating:
        average,

      feedbackCount:
        feedbacks.length,
    };
  };