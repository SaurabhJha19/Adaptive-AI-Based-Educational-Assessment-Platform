import {
  UserAnalyticsModel,
} from "../models/user-analytics.model";

import {
  RecommendationModel,
} from "../models/recommendation.model";

export const generateRecommendations =
  async (
    userId: string
  ) => {

    const analytics =
      await UserAnalyticsModel.findOne({
        userId,
      });

    if (!analytics) {
      return [];
    }

    await RecommendationModel.deleteMany({
      userId,
    });

    const recommendations =
      [];

    for (
      const topic of
      analytics.weakTopics
    ) {

      recommendations.push({
        userId,

        title:
          `Review ${topic}`,

        description:
          `Study notes related to ${topic}`,

        category:
          "study",

        topic,
      });

      recommendations.push({
        userId,

        title:
          `${topic} Practice Quiz`,

        description:
          `Attempt a focused assessment on ${topic}`,

        category:
          "quiz",

        topic,
      });
    }

    if (
      analytics.averageScore < 60
    ) {

      recommendations.push({
        userId,

        title:
          "Revision Session",

        description:
          "Review previous assessments before taking another test.",

        category:
          "revision",

        topic:
          "General",
      });
    }

    return RecommendationModel.insertMany(
      recommendations
    );
  };