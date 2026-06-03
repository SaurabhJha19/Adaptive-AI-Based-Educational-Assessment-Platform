import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IDocumentChunk
  extends Document {

  documentId:
    mongoose.Types.ObjectId;

  userId:
    mongoose.Types.ObjectId;

  chunkIndex: number;

  content: string;
}

const documentChunkSchema =
  new Schema<IDocumentChunk>(
    {
      documentId: {
        type: Schema.Types.ObjectId,
        ref: "Document",
        required: true,
      },

      chunkIndex: {
        type: Number,
        required: true,
      },

        userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },

      content: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const DocumentChunkModel =
  mongoose.model<IDocumentChunk>(
    "DocumentChunk",
    documentChunkSchema
  );