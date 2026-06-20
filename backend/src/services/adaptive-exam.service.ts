import {
  UserAnalyticsModel,
} from "../models/user-analytics.model";

export const getExamSettings =
  async (
    userId: string
  ): Promise<{
    difficulty:
      | "easy"
      | "medium"
      | "hard";
    topics: string[];
  }> => {

    const analytics =
      await UserAnalyticsModel.findOne({
        userId,
      });

    if (!analytics) {
      return {
        difficulty: "medium",
        topics: ["General"],
      };
    }

    return {
      difficulty:
        analytics.recommendedDifficulty as
          | "easy"
          | "medium"
          | "hard",

      topics:
        analytics.weakTopics.length > 0
          ? analytics.weakTopics
          : ["General"],
    };
  };