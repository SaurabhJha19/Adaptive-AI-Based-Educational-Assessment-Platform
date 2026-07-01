"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getExam,
} from "./exam.service";

export const useExam =
  (
    id: string
  ) => {

    return useQuery({

      queryKey: [
        "exam",
        id,
      ],

      queryFn:
        () =>
          getExam(id),

      enabled:
        !!id,

    });

  };