import { api }
from "@/services/api";

import {
  Exam,
  GenerateExamDto,
  ExamResult,
} from "./types";
import { SubmitExamPayload } from "./use-submit-exam";

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
  ): Promise<Exam> => {

    const response =
      await api.get(
        `/exams/${id}`
      );

    return response.data.exam;

  };

export const submitExam = async (
  payload: SubmitExamPayload
) => {
  const { data } = await api.post(
    `/exam-attempt/${payload.examId}/submit`,
    payload
  );

  return data;
};
export const getExamResult =
async (
examId: string
): Promise<ExamResult> => {

const response =
await api.get(

`/exam-attempt/${examId}/result`

);

return response.data.result;

};

export const getExams = async (): Promise<Exam[]> => {

  const response = await api.get("/exams");

    return (
        response.data.exams ??
        response.data.data ??
        response.data
    );

};

export const saveAttempt = async (
  attemptId: string,
  payload: {
    answers: any[];
    currentQuestion: number;
    remainingTime: number;
  }
) => {
  const { data } = await api.patch(
    `/exam-attempt/${attemptId}/save`,
    payload
  );

  return data;
};

export const getAttempt = async (
  attemptId: string
) => {
  const { data } = await api.get(
    `/simulator/attempt/${attemptId}`
  );

  return data;
};