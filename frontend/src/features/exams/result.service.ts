import { api } from "@/services/api";

export const getExamResult =
  async (
    examId: string
  ) => {

    const response =
      await api.get(
        `/exam-attempts/${examId}/result`
      );

    return response.data;
  };