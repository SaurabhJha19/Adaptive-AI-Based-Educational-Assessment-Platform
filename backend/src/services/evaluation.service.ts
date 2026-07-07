import { ExamModel }
from "../models/exam.model";

import { QuestionModel }
from "../models/question.model";

import { ExamAttemptModel }
from "../models/exam-attempt.model";

import {
  updateUserAnalytics,
} from "./analytics.service";

import OfficialExam from "../modules/simulator/models/official-exam.model";



export const getExamResult =
async (
    examId: string,
    userId: string,
) => {

    const attempt =
    await ExamAttemptModel
        .findOne({

            examId,

            userId,

        })
        .sort({
            createdAt: -1,
        });

    if (!attempt) {

        throw new Error(
            "Result not found"
        );

    }

    return attempt;

};

export const evaluateExam = async ({
  userId,
  examId,
  sourceType = "generated",
  sourceId,
  attemptId,
  answers,
}: {
  userId: string;
  examId: string;
  sourceType?: "generated" | "simulator";
  sourceId?: string;
  attemptId?: string;
  answers: {
    questionId: string;
    selectedAnswer: string;
  }[];
}) => {
  const exam =
    sourceType === "generated"
      ? await ExamModel.findById(examId)
      : await OfficialExam.findById(sourceId);

  if (!exam) {
    throw new Error("Exam not found");
  }

  let score = 0;

  const evaluatedAnswers = [];

  for (const answer of answers) {
    const question =
      await QuestionModel.findById(
        answer.questionId
      );

    if (!question) continue;

    const isCorrect =
      question.answer ===
      answer.selectedAnswer;

    if (isCorrect) {
      score++;
    }

    evaluatedAnswers.push({
      questionId: question._id,
      question: question.question,
      options: question.options,
      selectedAnswer:
        answer.selectedAnswer,
      correctAnswer:
        question.answer,
      explanation:
        question.explanation,
      difficulty:
        question.difficulty,
      isCorrect,
    });
  }

let totalQuestions = 0;

if (sourceType === "generated") {

    totalQuestions = exam.totalQuestions;

} else {

    const officialExam = exam as any;

    totalQuestions =
        officialExam.totalQuestions ??
        officialExam.sections.reduce(

            (sectionTotal: number, section: any) =>

                sectionTotal +

                section.questionGroups.reduce(

                    (groupTotal: number, group: any) =>

                        groupTotal +

                        group.questions.length,

                    0

                ),

            0

        );

}

  const percentage =
    totalQuestions === 0
      ? 0
      : (score / totalQuestions) * 100;

  let attempt;

  if (attemptId) {
    attempt =
      await ExamAttemptModel.findByIdAndUpdate(
        attemptId,
        {
          answers: evaluatedAnswers,
          score,
          percentage,
          totalQuestions,
          submittedAt: new Date(),
          status: "COMPLETED",
        },
        {
          new: true,
        }
      );
  } else {
    attempt =
      await ExamAttemptModel.create({
        userId,

        examId:
          sourceType === "generated"
            ? examId
            : undefined,

        sourceType,

        sourceId:
          sourceType === "simulator"
            ? sourceId
            : examId,

        answers: evaluatedAnswers,

        score,

        percentage,

        totalQuestions,

        submittedAt: new Date(),

        status: "COMPLETED",
      });
  }

  await updateUserAnalytics(userId);

  return {
    attempt,
    score,
    percentage,
    totalQuestions,
    correctAnswers: score,
    incorrectAnswers:
      totalQuestions - score,
    review: evaluatedAnswers,
  };
};

export const getAttemptSummary =
async (
    attemptId: string
) => {

    const attempt =
        await ExamAttemptModel
            .findById(attemptId)
            .lean();

    if (!attempt) {

        throw new Error(
            "Attempt not found"
        );

    }

    const correct =
        attempt.answers.filter(
            (a: any) => a.isCorrect
        ).length;

    const incorrect =
        attempt.answers.filter(
            (a: any) => !a.isCorrect
        ).length;

    return {

        id: attempt._id,

        score: attempt.score,

        percentage: attempt.percentage,

        totalQuestions: attempt.totalQuestions,

        correct,

        incorrect,

        skipped:

            attempt.totalQuestions -

            correct -

            incorrect,

        submittedAt:

            attempt.submittedAt,

        status:

            attempt.status,

    };

};

export const getQuestionReview =
async (
    attemptId: string
) => {

    const attempt =
        await ExamAttemptModel
            .findById(attemptId)
            .lean();

    if (!attempt) {

        throw new Error(
            "Attempt not found"
        );

    }

    return attempt.answers.map(

        (answer: any) => ({

            questionId:

                answer.questionId,

            question:

                answer.question,

            options:

                answer.options,

            selectedAnswer:

                answer.selectedAnswer,

            correctAnswer:

                answer.correctAnswer,

            explanation:

                answer.explanation,

            difficulty:

                answer.difficulty,

            isCorrect:

                answer.isCorrect,

        })

    );

};

export const getSectionBreakdown =
async (
    attemptId: string
) => {

    const attempt =
        await ExamAttemptModel
            .findById(attemptId)
            .lean();

    if (!attempt) {

        throw new Error(
            "Attempt not found"
        );

    }

    return [

        {

            section: "Overall",

            total: attempt.totalQuestions,

            correct: attempt.score,

            incorrect:

                attempt.totalQuestions -

                attempt.score,

            percentage:

                attempt.percentage,

        },

    ];

};