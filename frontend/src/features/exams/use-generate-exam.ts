"use client";

import {
  useMutation,
} from "@tanstack/react-query";

import {
  generateExam,
} from "./exam.service";

export const useGenerateExam =
  () => {

    return useMutation({

      mutationFn:
        generateExam,

    });

  };