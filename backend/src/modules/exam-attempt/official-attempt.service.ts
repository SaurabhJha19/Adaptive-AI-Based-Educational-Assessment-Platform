import  OfficialExamModel  from "../simulator/models/official-exam.model";
import { AssessmentItemModel }  from "../simulator/models/assessment-item.model";
import { OfficialAttemptModel } from "./official-attempt.model";

interface SaveAnswer {
  assessmentItemId: string;
  selectedAnswer: string;
}

interface SavePayload {
  answers: SaveAnswer[];
  currentQuestion: number;
  remainingTime: number;
}

/**
 * Start a new attempt
 */
export const startAttempt = async (
  userId: string,
  examId: string
) => {
  const exam = await OfficialExamModel.findById(examId);

  if (!exam) {
    throw new Error("Official exam not found.");
  }

  const existing = await OfficialAttemptModel.findOne({
    userId,
    officialExamId: examId,
    status: "IN_PROGRESS",
  });

  if (existing) {
    return existing;
  }

  const attempt = await OfficialAttemptModel.create({
    userId,
    officialExamId: examId,
    totalQuestions: exam.totalQuestions,
    remainingTime: exam.duration ?? 0,
    currentQuestion: 0,
    answers: [],
    score: 0,
    percentage: 0,
    status: "IN_PROGRESS",
  });

  return attempt;
};

/**
 * Load attempt
 */
export const getAttempt = async (
  attemptId: string
) => {
  const attempt =
    await OfficialAttemptModel.findById(attemptId)
      .populate("officialExamId")
      .populate("answers.assessmentItemId");

  if (!attempt) {
    throw new Error("Attempt not found.");
  }

  return attempt;
};

/**
 * Save progress
 */
export const saveAttempt = async (
  attemptId: string,
  payload: SavePayload
) => {
  const attempt =
    await OfficialAttemptModel.findById(attemptId);

  if (!attempt) {
    throw new Error("Attempt not found.");
  }

  attempt.answers = payload.answers.map((answer) => ({
    assessmentItemId: answer.assessmentItemId as any,
    selectedAnswer: answer.selectedAnswer,
    isCorrect: false,
  }));

  attempt.currentQuestion = payload.currentQuestion;
  attempt.remainingTime = payload.remainingTime;
  attempt.lastSavedAt = new Date();

  await attempt.save();

  return attempt;
};

/**
 * Submit attempt
 */
export const submitAttempt = async (
  attemptId: string
) => {

  const attempt =
    await OfficialAttemptModel.findById(attemptId);

  if (!attempt) {
    throw new Error("Attempt not found.");
  }

  if (attempt.status === "SUBMITTED") {
    return attempt;
  }

  let score = 0;

  const evaluatedAnswers = [];

  for (const answer of attempt.answers) {

    const assessmentItem =
      await AssessmentItemModel.findById(
        answer.assessmentItemId
      );

    if (!assessmentItem) {
      continue;
    }

    const correct =
      assessmentItem.correctAnswer ===
      answer.selectedAnswer;

    if (correct) {
      score++;
    }

    evaluatedAnswers.push({
      assessmentItemId:
        answer.assessmentItemId,

      selectedAnswer:
        answer.selectedAnswer,

      isCorrect: correct,
    });

  }

  attempt.answers = evaluatedAnswers as any;

  attempt.score = score;

  attempt.percentage =
    attempt.totalQuestions === 0
      ? 0
      : Math.round(
          (score /
            attempt.totalQuestions) *
            100
        );

  attempt.status = "SUBMITTED";

  attempt.submittedAt =
    new Date();

  await attempt.save();

  return attempt;

};

/**
 * Result
 */
export const getResult = async (
  attemptId: string
) => {

  const attempt =
    await OfficialAttemptModel.findById(
      attemptId
    )
      .populate("officialExamId")
      .populate(
        "answers.assessmentItemId"
      );

  if (!attempt) {
    throw new Error(
      "Attempt not found."
    );
  }

  return {

    attemptId:
      attempt._id,

    exam:
      attempt.officialExamId,

    score:
      attempt.score,

    percentage:
      attempt.percentage,

    totalQuestions:
      attempt.totalQuestions,

    answers:
      attempt.answers,

    submittedAt:
      attempt.submittedAt,

  };

};

/**
 * User history
 */
export const getMyAttempts =
  async (
    userId: string
  ) => {

    return OfficialAttemptModel.find({

      userId,

    })

      .populate(
        "officialExamId"
      )

      .sort({

        createdAt: -1,

      });

  };