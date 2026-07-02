import {DocumentModel} from "../models/document.model";
import {ExamModel} from "../models/exam.model";
import {ExamAttemptModel} from "../models/exam-attempt.model";

export const getDashboardData = async (
  userId: string
) => {

  const [
    documentCount,
    examCount,
    attempts,
  ] = await Promise.all([

    DocumentModel.countDocuments({
      userId,
    }),

    ExamModel.countDocuments({
      userId,
    }),

    ExamAttemptModel.find({
      userId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .populate("examId"),

  ]);

  const averageScore =
    attempts.length === 0
      ? 0
      : Math.round(
          attempts.reduce(
            (sum, item) => sum + item.percentage,
            0
          ) / attempts.length
        );

  return {

    documentCount,

    examCount,

    averageScore,

    studyHours: 0,

    recentExams: attempts,

  };

};