"use client";

import { useQuery } from "@tanstack/react-query";

import { getExams } from "./exam.service";

export const useExams = () => {

  return useQuery({

    queryKey: ["exams"],

    queryFn: getExams,

  });

};