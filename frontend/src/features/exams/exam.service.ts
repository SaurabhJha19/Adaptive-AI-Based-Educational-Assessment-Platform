import { api } from "@/services/api";

export const generateQuestions =
  async (
    documentId: string,
    count = 5
  ) => {

    const response =
      await api.post(
        "/questions/generate",
        {
          documentId,
          count,
        }
      );

    return response.data;
  };

export const createExam =
  async (
    documentId: string,
    title: string
  ) => {

    const response =
      await api.post(
        "/exams/create",
        {
          documentId,
          title,
        }
      );

    return response.data;
  };

export const getExams =
  async () => {

    const response =
      await api.get(
        "/exams"
      );

    return response.data;
  };

export const getExamById =
  async (
    examId: string
  ) => {

    const response =
      await api.get(
        `/exams/${examId}`
      );

    return response.data;
  };