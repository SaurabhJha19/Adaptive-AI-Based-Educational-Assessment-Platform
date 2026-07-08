"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
    parseOfficialExam,
} from "../services/simulator-admin.service";

import {
  archiveOfficialExam,
  createOfficialExam,
  deleteOfficialExam,
  getOfficialExam,
  getOfficialExams,
  publishOfficialExam,
  updateOfficialExam,
} from "../services/simulator-admin.service";
import { OfficialExam } from "../types";

export const useOfficialExams = () =>
  useQuery({
    queryKey: ["official-exams"],
    queryFn: getOfficialExams,
  });

export const useCreateOfficialExam =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createOfficialExam,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "official-exams",
          ],
        });
      },
    });
  };

export const useParseOfficialExam =
() => {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            parseOfficialExam,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: [
                    "official-exams",
                ],

            });

        },

    });

};

export const usePublishOfficialExam =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        publishOfficialExam,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "official-exams",
          ],
        });
      },
    });
  };

export const useArchiveOfficialExam =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        archiveOfficialExam,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "official-exams",
          ],
        });
      },
    });
  };

export const useDeleteOfficialExam =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteOfficialExam,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "official-exams",
          ],
        });
      },
    });
  };


export const useUpdateOfficialExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<OfficialExam>;
    }) =>
      updateOfficialExam(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["official-exams"],
      });
    },
  });
};

export const useOfficialExam = (
    id: string
) =>
    useQuery({

        queryKey: [
            "official-exam",
            id,
        ],

        queryFn: () =>
            getOfficialExam(id),

        enabled: !!id,

    });