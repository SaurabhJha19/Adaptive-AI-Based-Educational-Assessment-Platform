"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getDocuments,
} from "./document.service";

export const useDocuments =
  () => {

    return useQuery({
      queryKey:
        ["documents"],

      queryFn:
        getDocuments,
    });
  };