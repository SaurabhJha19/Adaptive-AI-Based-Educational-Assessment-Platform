import { Schema } from "mongoose";

import { QuestionGroupSchema } from "./question-group.model";

export const ExamSectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      default: 0,
    },

    instructions: {
      type: String,
      default: "",
    },

    questionGroups: {
      type: [QuestionGroupSchema],
      default: [],
    },
  },
  {
    _id: true,
  }
);