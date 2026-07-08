import { Schema } from "mongoose";
import { ContentBlockSchema }
from "../parser/core/content/content-block.schema";
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

instructionContent: {

    type: [
        ContentBlockSchema,
    ],

    default: [],

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