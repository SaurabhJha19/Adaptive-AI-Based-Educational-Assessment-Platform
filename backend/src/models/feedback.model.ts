import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IFeedback
  extends Document {

  userId:
    mongoose.Types.ObjectId;

  questionId:
    mongoose.Types.ObjectId;

  rating: number;

  comment?: string;
}

const feedbackSchema =
  new Schema<IFeedback>(
    {
      userId: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      questionId: {
        type:
          Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },

      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },

      comment: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

export const FeedbackModel =
  mongoose.model<IFeedback>(
    "Feedback",
    feedbackSchema
  );