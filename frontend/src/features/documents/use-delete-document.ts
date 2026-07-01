"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteDocument,
} from "./document.service";

export const useDeleteDocument =
  () => {

    const queryClient =
      useQueryClient();

    return useMutation({

      mutationFn:
        deleteDocument,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [
            "documents",
          ],
        });

      },

    });
  };