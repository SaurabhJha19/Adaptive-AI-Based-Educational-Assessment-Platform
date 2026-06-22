"use client";

import {
  useMutation,
} from "@tanstack/react-query";

import {
  uploadDocument,
} from "./document.service";

export const useUploadDocument =
  () => {

    return useMutation({
      mutationFn:
        uploadDocument,
    });
  };