"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getExamById,
} from "./exam.service";

export const useExam =
  (
    examId: string
  ) => {

    return useQuery({
      queryKey: [
        "exam",
        examId,
      ],

      queryFn: () =>
        getExamById(
          examId
        ),

      enabled:
        !!examId,
    });
  };