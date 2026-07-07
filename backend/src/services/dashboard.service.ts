import { User } from "../models/user.model";
import { DocumentModel } from "../models/document.model";
import { ExamModel } from "../models/exam.model";
import { ExamAttemptModel } from "../models/exam-attempt.model";
import { OfficialAttemptModel } from "../modules/exam-attempt/official-attempt.model";

export const getDashboardData = async (
    userId: string
) => {

    const [
        user,
        documentCount,
        generatedExamCount,
        generatedAttempts,
        officialAttempts,
        recentDocuments,
        latestGeneratedAttempt,
        latestOfficialAttempt,
    ] = await Promise.all([

        User.findById(userId),

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

        OfficialAttemptModel.find({
            userId,
            status: "SUBMITTED",
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
        })
            .sort({
                updatedAt: -1,
            })
            .populate("examId"),

        OfficialAttemptModel.findOne({
            userId,
            status: "IN_PROGRESS",
        })
            .sort({
                updatedAt: -1,
            })
            .populate("officialExamId"),

    ]);

    const completedAttempts = [

        ...generatedAttempts,

        ...officialAttempts,

    ];

    const averageScore =
        completedAttempts.length === 0
            ? 0
            : Math.round(

                  completedAttempts.reduce(

                      (sum, item) =>

                          sum + (item.percentage ?? 0),

                      0

                  ) /

                      completedAttempts.length

              );

    const questionsSolved =
        completedAttempts.reduce(

            (sum, item) =>

                sum + (item.totalQuestions ?? 0),

            0

        );

    const continueLearning =
        latestGeneratedAttempt ??
        latestOfficialAttempt ??
        null;

    const recentExams =
        [...generatedAttempts, ...officialAttempts]

            .sort(
                (a: any, b: any) =>
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
            )

            .slice(0, 5);

    return {

        profile: {

            firstName:
                user?.firstName ?? "",

            targetExam:
                user?.targetExam ?? "",

        },

        stats: {

            documentCount,

            examCount:
                generatedAttempts.length +
                officialAttempts.length,

            averageScore,

            studyHours: 0,

            questionsSolved,

        },

        continueLearning,

        recentDocuments,

        recentExams,

        weakAreas: [],

        recommendations: [

            {

                title:
                    "Reading Comprehension",

                description:
                    "Continue practicing Reading Module 2 to improve consistency.",

            },

        ],

    };

};