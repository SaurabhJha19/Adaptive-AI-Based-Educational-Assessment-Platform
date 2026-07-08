import { Schema } from "mongoose";

import SharedContentSchema from "./shared-content.model";
import { AssessmentItemSchema } from "./assessment-item.model";
import { ContentBlockSchema }
from "../parser/core/content/content-block.schema";

export const QuestionGroupSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      required: true,
    },

content: {

    type: [
        ContentBlockSchema,
    ],

    default: [],

},

    questions: {
      type: [AssessmentItemSchema],
      default: [],
    },
  },
  {
    _id: true,
  }
);