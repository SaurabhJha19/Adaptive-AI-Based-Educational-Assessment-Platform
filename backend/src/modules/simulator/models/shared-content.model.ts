import { Schema, model } from "mongoose";

import { SharedContentType } from "../constants/shared-content.enum";

const SharedContentSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(SharedContentType),
      required: true,
    },

    title: {
      type: String,
      trim: true,
    },

    content: {
      type: String,
    },

    assets: [
      {
        type: String,
      },
    ],

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    _id: true,
  }
);

export default model(
  "SimulatorSharedContent",
  SharedContentSchema
);