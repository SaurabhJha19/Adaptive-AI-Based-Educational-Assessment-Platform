"use client";

import {
  useMutation,
} from "@tanstack/react-query";

import {
  createExam,
  generateQuestions,
} from "./exam.service";

export const useGenerateExam =
  () => {

    return useMutation({

      mutationFn: async (
        documentId: string
      ) => {

        await generateQuestions(
          documentId,
          5
        );

        const result =
          await createExam(
            documentId,
            "Generated Exam"
          );

        return result;
      },
    });
  };