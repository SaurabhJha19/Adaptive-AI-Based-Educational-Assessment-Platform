import { Schema, model, Model, Document } from "mongoose";

import { ExamType } from "../constants/exam-type.enum";
import { SimulatorStatus } from "../constants/simulator-status.enum";

import { ExamSectionSchema } from "./exam-section.model";

export interface IOfficialExam extends Document {
    examCode: string;
    title: string;
    slug: string;
    description: string;

    examType: string;

    publisher: string;

    year?: number;

    duration: number;

    totalQuestions: number;

    pdfUrl: string;

    pdfKey: string;

    parserVersion: string;

    status: string;

    sections: any[];

    metadata?: Record<string, any>;

    createdBy?: Schema.Types.ObjectId;

    createdAt: Date;

    updatedAt: Date;
}

const OfficialExamSchema = new Schema<IOfficialExam>(
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

    pdfKey: {
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
      default: SimulatorStatus.PROCESSING,
    },

    sections: {
      type: [ExamSectionSchema] as unknown as any[],
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

const OfficialExam = model<IOfficialExam>(
  "OfficialExam",
  OfficialExamSchema
);

export{ OfficialExam};

export default OfficialExam;