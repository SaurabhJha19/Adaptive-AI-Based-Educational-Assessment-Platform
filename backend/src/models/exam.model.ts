import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IExam
  extends Document {

  userId: mongoose.Types.ObjectId;

  documentId: mongoose.Types.ObjectId;

  title: string;

  questions:
    mongoose.Types.ObjectId[];

  totalQuestions: number;

  status:
    | "draft"
    | "published";

}

const examSchema =
  new Schema<IExam>(
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

      title: {
        type: String,
        required: true,
      },

      questions: [
        {
          type:
            Schema.Types.ObjectId,
          ref: "Question",
        },
      ],

      totalQuestions: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "draft",
          "published",
        ],
        default: "draft",
      },
    },
    {
      timestamps: true,
    }
  );

export const ExamModel =
  mongoose.model<IExam>(
    "Exam",
    examSchema
  );