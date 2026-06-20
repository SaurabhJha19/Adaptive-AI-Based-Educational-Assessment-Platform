import {
  UserAnalyticsModel,
} from "../models/user-analytics.model";

import {
  ExamAttemptModel,
} from "../models/exam-attempt.model";

import {
  QuestionModel,
} from "../models/question.model";

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
      return;
    }

    const totalExams =
      attempts.length;

    const averageScore =
      attempts.reduce(
        (sum, attempt) =>
          sum + attempt.percentage,
        0
      ) / totalExams;

    const topicStats:
      Record<
        string,
        {
          correct: number;
          total: number;
        }
      > = {};

    for (
      const attempt of attempts
    ) {

      for (
        const answer of attempt.answers
      ) {

        const question =
          await QuestionModel.findById(
            answer.questionId
          );

        if (!question) {
          continue;
        }

        const topic =
          question.topic ||
          "General";

        if (
          !topicStats[topic]
        ) {
          topicStats[topic] = {
            correct: 0,
            total: 0,
          };
        }

        topicStats[
          topic
        ].total++;

        if (
          answer.isCorrect
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

        const score =
          (stats.correct /
            stats.total) *
          100;

        if (score >= 80) {
          strongTopics.push(
            topic
          );
        }

        if (score <= 50) {
          weakTopics.push(
            topic
          );
        }
      }
    );

    let recommendedDifficulty:
      | "easy"
      | "medium"
      | "hard" =
      "medium";

    if (
      averageScore < 50
    ) {
      recommendedDifficulty =
        "easy";
    } else if (
      averageScore > 80
    ) {
      recommendedDifficulty =
        "hard";
    }

    await UserAnalyticsModel.findOneAndUpdate(
      {
        userId,
      },
      {
        userId,

        totalExams,

        averageScore,

        strongTopics,

        weakTopics,

        recommendedDifficulty,
      },
      {
        upsert: true,
        new: true,
      }
    );
  };