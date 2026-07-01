import mongoose, { Schema, Document } from "mongoose";

export interface IDocument extends Document {
  userId: mongoose.Types.ObjectId;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  s3Key: string;
  s3Url: string;
  status:
    | "uploaded"
    | "processing"
    | "processed"
    | "failed";
}

const documentSchema = new Schema<IDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    s3Key: {
      type: String,
      required: true,
    },

    s3Url: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "uploaded",
        "processing",
        "processed",
        "failed",
      ],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

export const DocumentModel =
  mongoose.model<IDocument>(
    "Document",
    documentSchema
  );