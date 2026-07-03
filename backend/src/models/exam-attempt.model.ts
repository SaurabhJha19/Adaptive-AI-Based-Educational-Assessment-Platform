import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IAnswer {
  questionId: mongoose.Types.ObjectId;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface IExamAttempt
  extends Document {

  userId: mongoose.Types.ObjectId;

  examId?: mongoose.Types.ObjectId;

  sourceType: "generated" | "simulator";

  sourceId?: mongoose.Types.ObjectId;

  answers: IAnswer[];

  score: number;

  totalQuestions: number;

  percentage: number;

  startedAt: Date;

  status : string;

  currentQuestion: number;

  remainingTime: number;

  lastSavedAt: Date;

  submittedAt: Date;
}

const answerSchema =
  new Schema<IAnswer>(
    {
      questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },

      selectedAnswer: {
        type: String,
        required: true,
      },

      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
    {
      _id: false,
    }
  );

const examAttemptSchema =
  new Schema<IExamAttempt>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      examId: {
        type: Schema.Types.ObjectId,
        ref: "Exam",
        required: false,
        default: undefined,
      },

      sourceType: {
        type: String,
        enum: ["generated", "simulator"],
        default: "generated",
      },

      sourceId: {
        type: Schema.Types.ObjectId,
        required: true,
      },

      answers: [
        answerSchema,
      ],

      score: {
        type: Number,
        required: true,
      },

      totalQuestions: {
        type: Number,
        required: true,
      },

      percentage: {
        type: Number,
        required: true,
      },

      startedAt: {
        type: Date,
        default: Date.now,
      },

      currentQuestion: {
        type: Number,
        default: 0,
      },

      remainingTime: {
        type: Number,
        default: 0,
      },

      lastSavedAt: {
        type: Date,
        default: Date.now,
      },

      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export const ExamAttemptModel =
  mongoose.model<IExamAttempt>(
    "ExamAttempt",
    examAttemptSchema
  );