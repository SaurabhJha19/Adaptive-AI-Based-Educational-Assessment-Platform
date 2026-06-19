import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IAnswer {
  questionId: mongoose.Types.ObjectId;
  selectedAnswer: string;
  correct: boolean;
}

export interface IExamAttempt
  extends Document {

  userId: mongoose.Types.ObjectId;

  examId: mongoose.Types.ObjectId;

  answers: IAnswer[];

  score: number;

  totalQuestions: number;

  percentage: number;

  status:
    | "completed"
    | "in_progress";
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

      correct: {
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

      status: {
        type: String,
        enum: [
          "completed",
          "in_progress",
        ],
        default:
          "completed",
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