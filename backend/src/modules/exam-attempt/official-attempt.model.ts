import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IOfficialAnswer {
  assessmentItemId: mongoose.Types.ObjectId;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface IOfficialAttempt extends Document {
  userId: mongoose.Types.ObjectId;

  officialExamId: mongoose.Types.ObjectId;

  answers: IOfficialAnswer[];

  score: number;

  totalQuestions: number;

  percentage: number;

  status: "IN_PROGRESS" | "SUBMITTED";

  startedAt: Date;

  submittedAt?: Date;

  currentQuestion: number;

  remainingTime: number;

  lastSavedAt: Date;
}

const answerSchema =
  new Schema<IOfficialAnswer>(
    {
      assessmentItemId: {
        type: Schema.Types.ObjectId,
        ref: "AssessmentItem",
        required: true,
      },

      selectedAnswer: {
        type: String,
        default: "",
      },

      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
    {
      _id: false,
    }
  );

const officialAttemptSchema =
  new Schema<IOfficialAttempt>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      officialExamId: {
        type: Schema.Types.ObjectId,
        ref: "OfficialExam",
        required: true,
      },

      answers: {
        type: [answerSchema],
        default: [],
      },

      score: {
        type: Number,
        default: 0,
      },

      totalQuestions: {
        type: Number,
        default: 0,
      },

      percentage: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: ["IN_PROGRESS", "SUBMITTED"],
        default: "IN_PROGRESS",
      },

      startedAt: {
        type: Date,
        default: Date.now,
      },

      submittedAt: {
        type: Date,
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
    },
    {
      timestamps: true,
    }
  );

export const OfficialAttemptModel =
  mongoose.model<IOfficialAttempt>(
    "OfficialAttempt",
    officialAttemptSchema
  );