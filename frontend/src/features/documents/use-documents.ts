"use client";

import {
  useQuery,
} from "@tanstack/react-query";
import { Document } from "@/types/document";
import {
  getDocuments,
} from "./document.service";

export const useDocuments =
  () => {

        return useQuery({
        queryKey: ["documents"],
        queryFn: getDocuments,

        refetchInterval: (query) => {
            const docs =
            query.state.data?.documents;

            const processing =
            docs?.some(
                (doc: Document) =>
                doc.status ===
                "processing"
            );

            return processing
            ? 3000
            : false;
        },
        });
  };