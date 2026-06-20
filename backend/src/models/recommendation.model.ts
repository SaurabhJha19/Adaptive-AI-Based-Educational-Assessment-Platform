import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IRecommendation
  extends Document {

  userId:
    mongoose.Types.ObjectId;

  title: string;

  description: string;

  category:
    | "study"
    | "quiz"
    | "revision";

  topic: string;

  completed: boolean;
}

const recommendationSchema =
  new Schema<IRecommendation>(
    {
      userId: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        enum: [
          "study",
          "quiz",
          "revision",
        ],
        required: true,
      },

      topic: {
        type: String,
        required: true,
      },

      completed: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export const RecommendationModel =
  mongoose.model<IRecommendation>(
    "Recommendation",
    recommendationSchema
  );