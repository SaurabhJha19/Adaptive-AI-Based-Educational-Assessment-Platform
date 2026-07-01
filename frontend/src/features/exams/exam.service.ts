import { api }
from "@/services/api";

import {
  Exam,
  GenerateExamDto,
  ExamAnswer,
  ExamResult,
} from "./types";

export const generateExam =
  async (
    data: GenerateExamDto
  ): Promise<Exam> => {

    const response =
      await api.post(
        "/exams/create",
        data
      );

    return response.data.exam;
  };

export const getExam =
  async (
    id: string
  ) => {

    const response =
      await api.get(
        `/exams/${id}`
      );

    return response.data.exam;

  };

export const submitExam = async (
  examId: string,
  answers: ExamAnswer[]
): Promise<ExamResult> => {

  const response =
    await api.post(
      "/exams/submit",
      {
        examId,
        answers,
      }
    );

  return response.data;
};

export const getExamResult =
async (
examId: string
): Promise<ExamResult> => {

const response =
await api.get(

`/exam-attempts/result/${examId}`

);

return response.data.result;

};