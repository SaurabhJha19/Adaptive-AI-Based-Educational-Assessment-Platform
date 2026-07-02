import { Schema, model, Model } from "mongoose";

import { ExamType } from "../constants/exam-type.enum";
import { SimulatorStatus } from "../constants/simulator-status.enum";

import { ExamSectionSchema } from "./exam-section.model";

const OfficialExamSchema = new Schema(
  {
    examCode: {
      type: String,
      unique: true,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    examType: {
      type: String,
      enum: Object.values(ExamType),
      required: true,
    },

    publisher: {
      type: String,
      default: "",
    },

    year: {
      type: Number,
    },

    duration: {
      type: Number,
      required: true,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    parserVersion: {
      type: String,
      default: "1.0.0",
    },

    status: {
      type: String,
      enum: Object.values(SimulatorStatus),
      default: SimulatorStatus.UPLOADED,
    },

    sections: {
      type: [ExamSectionSchema],
      default: [],
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

OfficialExamSchema.index({
    examType:1,
    status:1,
});

OfficialExamSchema.index({
    examCode:1,
});

const OfficialExam: Model<any> = model(
  "OfficialExam",
  OfficialExamSchema
);

export default OfficialExam;