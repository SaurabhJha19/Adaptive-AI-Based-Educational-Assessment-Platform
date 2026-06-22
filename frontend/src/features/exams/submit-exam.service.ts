import { api }
from "@/services/api";

export const submitExam =
  async (
    examId: string,
    answers: {
      questionId: string;
      selectedAnswer: string;
    }[]
  ) => {

    const response =
      await api.post(
        `/exams/${examId}/submit`,
        {
          answers,
        }
      );

    return response.data;
  };