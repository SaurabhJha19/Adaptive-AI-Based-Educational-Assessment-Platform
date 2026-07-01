export interface Document {

  _id: string;

  originalName: string;

  fileSize: number;

  mimeType: string;

  status:
    | "uploaded"
    | "processing"
    | "processed"
    | "failed";

  createdAt: string;
}