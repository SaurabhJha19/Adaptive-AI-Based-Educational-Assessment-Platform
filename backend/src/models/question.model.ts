import mongoose, {
  Schema,
  Document
} from "mongoose";

export interface IQuestion
  extends Document {

  userId: mongoose.Types.ObjectId;

  documentId: mongoose.Types.ObjectId;

  examId: mongoose.Types.ObjectId;

  question: string;

  options: string[];

  answer: string;

  explanation?: string;

  sourceChunkIds?: string[];

  topic: string;

  averageRating?: number;

  feedbackCount?: number;

  difficulty:
    | "easy"
    | "medium"
    | "hard";

  type:
    | "mcq"
    | "true_false"
    | "short_answer";
}

const questionSchema =
  new Schema<IQuestion>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      documentId: {
        type: Schema.Types.ObjectId,
        ref: "Document",
        required: true,
      },

      examId: {
        type: Schema.Types.ObjectId,
        ref: "Exam",
        required: true,
      },

      question: {
        type: String,
        required: true,
      },

      options: [
        {
          type: String,
        },
      ],

      answer: {
        type: String,
        required: true,
      },

      explanation: {
        type: String,
        default: "",
      },

      sourceChunkIds: {
        type: [String],
        default: [],
      },

      difficulty: {
        type: String,
        enum: [
          "easy",
          "medium",
          "hard",
        ],
        default: "medium",
      },

      topic: {
        type: String,
        required: true,
      },

      averageRating: {
        type: Number,
        default: 0,
      },

      feedbackCount: {
        type: Number,
        default: 0,
      },

      type: {
        type: String,
        enum: [
          "mcq",
          "true_false",
          "short_answer",
        ],
        default: "mcq",
      },
    },
    {
      timestamps: true,
    }
  );

export const QuestionModel =
  mongoose.model<IQuestion>(
    "Question",
    questionSchema
  );