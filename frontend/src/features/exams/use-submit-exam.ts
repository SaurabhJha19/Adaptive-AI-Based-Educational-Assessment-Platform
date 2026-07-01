"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  submitExam,
} from "./exam.service";

import {
  ExamAnswer,
  ExamResult,
} from "./types";

export const useSubmitExam =
  () => {

    const queryClient =
      useQueryClient();

    return useMutation({

      mutationFn: ({
        examId,
        answers,
      }: {
        examId: string;
        answers: ExamAnswer[];
      }) =>
        submitExam(
          examId,
          answers
        ),

      onSuccess: (
        result: ExamResult,
        variables
      ) => {

        queryClient.setQueryData(
          [
            "exam-result",
            variables.examId,
          ],
          result
        );

      },

    });

  };