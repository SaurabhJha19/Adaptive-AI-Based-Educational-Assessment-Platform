import { api } from "@/services/api";

export type GenerateExamRequest = {
  documentId: string;
  title: string;
};

export const generateExam =
  async (
    data: GenerateExamRequest
  ) => {

    const response =
      await api.post(
        "/exams/create",
        data
      );

    return response.data;
  };