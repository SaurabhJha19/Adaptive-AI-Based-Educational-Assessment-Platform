"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { submitExam } from "./exam.service";

import { ExamResult } from "./types";

export interface SubmitExamPayload {
  examId: string;

  sourceType?: "generated" | "simulator";

  sourceId?: string;

  attemptId?: string;

  answers: {
    questionId: string;
    selectedAnswer: string;
  }[];
}

export const useSubmitExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitExamPayload) =>
      submitExam(payload),

    onSuccess: (
      result: ExamResult,
      variables
    ) => {
      queryClient.setQueryData(
        ["exam-result", variables.examId],
        result
      );
    },
  });
};