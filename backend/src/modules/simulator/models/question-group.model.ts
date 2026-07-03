import { Schema } from "mongoose";

import  SharedContentSchema from "./shared-content.model";
import { AssessmentItemSchema } from "./assessment-item.model";

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

    sharedContent: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "SharedContent",
    },

    items: {
      type: [AssessmentItemSchema],
      default: [],
    },
  },
  {
    _id: true,
  }
);