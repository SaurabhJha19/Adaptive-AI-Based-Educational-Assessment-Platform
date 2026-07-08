import {
  Schema,
  model,
  Document,
} from "mongoose";

import { ExamType } from "../constants/exam-type.enum";
import { SimulatorStatus } from "../constants/simulator-status.enum";

import { ExamSectionSchema } from "./exam-section.model";

export interface IOfficialExam
  extends Document {

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

  answerPdfUrl?: string;

  answerPdfKey?: string;

  parserVersion: string;

  status: string;

  sections: any[];

  metadata?: Record<string, any>;

  createdBy?: Schema.Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

const OfficialExamSchema =
  new Schema<IOfficialExam>(
    {

      examCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
      },

      description: {
        type: String,
        default: "",
      },

      examType: {
        type: String,
        enum: Object.values(
          ExamType
        ),
        required: true,
      },

      publisher: {
        type: String,
        default: "",
      },

      year: Number,

      duration: {
        type: Number,
        default: 180,
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

      answerPdfUrl: {
        type: String,
        default: "",
      },

      answerPdfKey: {
        type: String,
        default: "",
      },

      parserVersion: {
        type: String,
        default: "1.0.0",
      },

      status: {
        type: String,
        enum: Object.values(
          SimulatorStatus
        ),
        default:
          SimulatorStatus.UPLOADED,
      },

      sections: {
        type: [
          ExamSectionSchema,
        ] as unknown as any[],
        default: [],
      },

      metadata: {

          parser: {

              parserVersion: {

                  type: String,

                  default: "1.0.0",

              },

              extractorVersion: {

                  type: String,

                  default: "pdfjs-1.0.0",

              },

              promptVersion: {

                  type: String,

                  default: "sat-prompt-2.0.0",

              },

              schemaVersion: {

                  type: String,

                  default: "content-schema-1.0.0",

              },

              llmModel: {

                  type: String,

                  default: process.env.OPENAI_MODEL,

              },

              parsedAt: {

                  type: Date,

                  default: Date.now,

              },

              processingTimeMs: {

                  type: Number,

                  default: 0,

              },

          },

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
  examCode: 1,
});

OfficialExamSchema.index({
  examType: 1,
  status: 1,
});

const OfficialExam =
  model<IOfficialExam>(
    "OfficialExam",
    OfficialExamSchema
  );

export default OfficialExam;
export { OfficialExam };