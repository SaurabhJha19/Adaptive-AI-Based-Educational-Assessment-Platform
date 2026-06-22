"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getExamResult,
} from "./result.service";

export const useResult =
  (
    examId: string
  ) => {

    return useQuery({
      queryKey: [
        "result",
        examId,
      ],

      queryFn: () =>
        getExamResult(
          examId
        ),

      enabled:
        !!examId,
    });
  };