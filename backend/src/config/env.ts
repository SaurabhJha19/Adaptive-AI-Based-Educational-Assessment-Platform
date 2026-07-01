import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT:
    process.env.PORT || "5000",

  MONGODB_URI:
    process.env.MONGODB_URI || "",

  JWT_SECRET:
    process.env.JWT_SECRET || "",

  OPENAI_API_KEY:
    process.env.OPENAI_API_KEY ||
    "API_PENDING_KEY",

  EMBEDDING_MODEL:
    process.env.EMBEDDING_MODEL ||
    "text-embedding-3-small",

  QUESTION_MODEL:
    process.env.QUESTION_MODEL ||
    "gpt-4.1-mini",

  EXPLAINER_MODEL:
    process.env.EXPLAINER_MODEL ||
    "gpt-4.1-mini",

  AWS_REGION:
  process.env.AWS_REGION || "",

  AWS_ACCESS_KEY_ID:
    process.env.AWS_ACCESS_KEY_ID || "",

  AWS_SECRET_ACCESS_KEY:
    process.env.AWS_SECRET_ACCESS_KEY || "",

  AWS_S3_BUCKET_NAME:
    process.env.AWS_S3_BUCKET_NAME || "",
};