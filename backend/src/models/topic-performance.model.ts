import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface ITopicPerformance
  extends Document {

  topic: string;

  averageRating: number;

  totalRatings: number;

  totalQuestions: number;
}

const topicPerformanceSchema =
  new Schema<ITopicPerformance>(
    {
      topic: {
        type: String,
        required: true,
        unique: true,
      },

      averageRating: {
        type: Number,
        default: 0,
      },

      totalRatings: {
        type: Number,
        default: 0,
      },

      totalQuestions: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

export const TopicPerformanceModel =
  mongoose.model<ITopicPerformance>(
    "TopicPerformance",
    topicPerformanceSchema
  );