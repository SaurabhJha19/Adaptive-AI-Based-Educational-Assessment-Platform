import { api }
from "@/services/api";

import {
  Exam,
  GenerateExamDto,
  ExamAnswer,
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
    "/exam-attempt/submit",
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

`/exam-attempts/result/${examId}`

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