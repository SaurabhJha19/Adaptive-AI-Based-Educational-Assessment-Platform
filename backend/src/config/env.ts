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
    "GPT_PENDING_KEY",
};