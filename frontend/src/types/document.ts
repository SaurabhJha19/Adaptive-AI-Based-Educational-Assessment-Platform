export interface Document {

  _id: string;

  originalName: string;

  status:
    | "uploaded"
    | "processing"
    | "processed"
    | "failed";

  createdAt: string;
}