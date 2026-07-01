"use client";

import {
  useQueryClient,
} from "@tanstack/react-query";

import {
  ExamResult,
} from "./types";

export const useExamResult =
  (
    examId: string
  ) => {

    const queryClient =
      useQueryClient();

    return queryClient.getQueryData<ExamResult>([
      "exam-result",
      examId,
    ]);

  };