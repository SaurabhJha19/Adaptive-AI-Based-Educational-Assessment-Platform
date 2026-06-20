import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IUserAnalytics
  extends Document {

  userId:
    mongoose.Types.ObjectId;

  totalExams: number;

  averageScore: number;

  strongTopics: string[];

  weakTopics: string[];

  recommendedDifficulty:
    "easy"
    | "medium"
    | "hard";
}

const userAnalyticsSchema =
  new Schema<IUserAnalytics>(
    {
      userId: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      totalExams: {
        type: Number,
        default: 0,
      },

      averageScore: {
        type: Number,
        default: 0,
      },

      strongTopics: [
        {
          type: String,
        },
      ],

      weakTopics: [
        {
          type: String,
        },
      ],

      recommendedDifficulty: {
        type: String,
        enum: [
          "easy",
          "medium",
          "hard",
        ],
        default:
          "medium",
      },
    },
    {
      timestamps: true,
    }
  );

export const UserAnalyticsModel =
  mongoose.model<IUserAnalytics>(
    "UserAnalytics",
    userAnalyticsSchema
  );