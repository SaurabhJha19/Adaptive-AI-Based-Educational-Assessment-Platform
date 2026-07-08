import mongoose, { Schema } from "mongoose";
import { QuestionType } from "../constants/question-type.enum";
import { ContentBlockSchema } from "../parser/core/content/content-block.schema";

export const AssessmentItemSchema = new Schema(
  {
    questionNumber: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(QuestionType),
      default: QuestionType.SINGLE_CHOICE,
    },

    prompt: {
      type: String,
      required: true,
    },

    content: {

      type: [
          ContentBlockSchema,
      ],

      default: [],

  },

    options: {
      type: [String],
      default: [],
    },

    correctAnswer: {
      type: Schema.Types.Mixed,
      required: true,
    },

    explanation: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      default: "Medium",
    },

    points: {
      type: Number,
      default: 1,
    },
  },
  {
    _id: true,
  }
);

export const AssessmentItemModel = mongoose.model(
  "AssessmentItem",
  AssessmentItemSchema
);