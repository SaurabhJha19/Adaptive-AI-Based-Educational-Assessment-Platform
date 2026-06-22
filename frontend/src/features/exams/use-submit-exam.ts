"use client";

import {
  useMutation,
} from "@tanstack/react-query";

import {
  submitExam,
} from "./submit-exam.service";

export const useSubmitExam =
  () => {

    return useMutation({

      mutationFn: ({
        examId,
        answers,
      }: {
        examId: string;

        answers: {
          questionId: string;
          selectedAnswer: string;
        }[];
      }) =>
        submitExam(
          examId,
          answers
        ),
    });
  };