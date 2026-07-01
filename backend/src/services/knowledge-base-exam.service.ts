import {
  generateQuestions,
} from "./question-generator.service";

export const generateKnowledgeBaseExam =
  async ({
    userId,
    documentIds,
    count = 10,
  }: {
    userId: string;
    documentIds?: string[];
    count?: number;
  }) => {

return generateQuestions({

  userId,

  documentId:
    documentIds?.[0] ??
    "knowledge-base",

  examId: "knowledge-base",

  count,

  difficultyOverride: undefined,

});

  };