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

  embedding: number[];

  metadata?: {
    page?: number;
    source?: string;
    documentName?: string;
  };
}

const documentChunkSchema =
  new Schema<IDocumentChunk>(
    {
      documentId: {
        type: Schema.Types.ObjectId,
        ref: "Document",
        required: true,
        index: true,
      },

      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      chunkIndex: {
        type: Number,
        required: true,
      },

      content: {
        type: String,
        required: true,
      },

      embedding: {
        type: [Number],
        default: [],
      },

      metadata: {
        page: {
          type: Number,
        },

        source: {
          type: String,
        },

        documentName:{ 
          type: String,
        },
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