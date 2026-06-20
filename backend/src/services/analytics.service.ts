import {
  ExamAttemptModel
} from "../models/exam-attempt.model";

import {
  QuestionModel
} from "../models/question.model";

import {
  UserAnalyticsModel
} from "../models/user-analytics.model";

export const updateUserAnalytics =
  async (
    userId: string
  ) => {

    const attempts =
      await ExamAttemptModel.find({
        userId,
      });

    if (
      attempts.length === 0
    ) {
      return null;
    }

    const totalScore =
      attempts.reduce(
        (sum, attempt) =>
          sum +
          attempt.percentage,
        0
      );

    const averageScore =
      totalScore /
      attempts.length;

    const topicStats:
      Record<
        string,
        {
          correct: number;
          total: number;
        }
      > = {};

    for (
      const attempt
      of attempts
    ) {

      for (
        const answer
        of attempt.answers
      ) {

        const question =
          await QuestionModel.findById(
            answer.questionId
          );

        if (!question)
          continue;

        const topic =
          question.topic;

        if (
          !topicStats[topic]
        ) {

          topicStats[
            topic
          ] = {
            correct: 0,
            total: 0,
          };
        }

        topicStats[
          topic
        ].total++;

        if (
          answer.correct
        ) {

          topicStats[
            topic
          ].correct++;
        }
      }
    }

    const strongTopics:
      string[] = [];

    const weakTopics:
      string[] = [];

    Object.entries(
      topicStats
    ).forEach(
      ([topic, stats]) => {

        const accuracy =
          (
            stats.correct /
            stats.total
          ) *
          100;

        if (
          accuracy >= 75
        ) {

          strongTopics.push(
            topic
          );

        } else if (
          accuracy < 50
        ) {

          weakTopics.push(
            topic
          );
        }
      }
    );

    let recommendedDifficulty:
      "easy"
      | "medium"
      | "hard";

    if (
      averageScore >= 80
    ) {

      recommendedDifficulty =
        "hard";

    } else if (
      averageScore >= 60
    ) {

      recommendedDifficulty =
        "medium";

    } else {

      recommendedDifficulty =
        "easy";
    }

    return await
      UserAnalyticsModel.findOneAndUpdate(
        { userId },

        {
          userId,
          totalExams:
            attempts.length,

          averageScore,

          strongTopics,

          weakTopics,

          recommendedDifficulty,
        },

        {
          upsert: true,
          returnDocument:
            "after",
        }
      );
  };