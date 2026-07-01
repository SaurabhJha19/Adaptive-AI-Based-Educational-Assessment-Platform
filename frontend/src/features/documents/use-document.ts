"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getDocument,
} from "./document.service";

export const useDocument =
  (
    id: string
  ) => {

    return useQuery({
      queryKey: [
        "document",
        id,
      ],

      queryFn: () =>
        getDocument(id),

      enabled: !!id,
    });
  };