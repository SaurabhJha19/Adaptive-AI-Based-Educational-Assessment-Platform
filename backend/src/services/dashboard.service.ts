import { DocumentModel } from "../models/document.model";
import { ExamModel } from "../models/exam.model";
import { ExamAttemptModel } from "../models/exam-attempt.model";

export const getDashboardData = async (
  userId: string
) => {
  const [
    documentCount,
    examCount,
    completedAttempts,
    recentDocuments,
    latestAttempt,
    recentAttempts,
  ] = await Promise.all([
    DocumentModel.countDocuments({
      userId,
    }),

    ExamModel.countDocuments({
      userId,
    }),

    ExamAttemptModel.find({
      userId,
      status: "COMPLETED",
    }),

    DocumentModel.find({
      userId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(5),

    ExamAttemptModel.findOne({
      userId,
      status: "IN_PROGRESS",
    }).sort({
      updatedAt: -1,
    }),

    ExamAttemptModel.find({
      userId,
    })
      .sort({
        updatedAt: -1,
      })
      .limit(5)
      .populate("examId"),
  ]);

  const averageScore =
    completedAttempts.length === 0
      ? 0
      : Math.round(
          completedAttempts.reduce(
            (sum, item) => sum + (item.percentage ?? 0),
            0
          ) / completedAttempts.length
        );

  return {
    stats: {
      documentCount,
      examCount,
      averageScore,
      studyHours: 0,
    },

    continueLearning: latestAttempt,

    recentDocuments,

    recentActivity: recentAttempts,

    recommendation: {
      title: "Reading Comprehension",
      description:
        "Complete another reading assessment to improve consistency.",
    },

    weeklyProgress: {
      completedAssessments: completedAttempts.length,
      averageScore,
    },
  };
};