"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import ExamLoading
from "@/features/exams/components/exam-loading";

import {
  useGenerateExam,
} from "@/features/exams/use-generate-exam";

export default function GeneratingExamPage() {

  const router =
    useRouter();

  const params =
    useSearchParams();

  const mutation =
    useGenerateExam();

  useEffect(() => {

    const generate =
      async () => {

        try {

          const exam =
            await mutation.mutateAsync({

              documentId:
                params.get(
                  "documentId"
                )!,

              title:
                params.get(
                  "title"
                )!,

              questionCount:
                Number(
                  params.get(
                    "questionCount"
                  )
                ),

              difficulty:
                params.get(
                  "difficulty"
                ) as any,

            });

          router.replace(
            `/exams/${exam._id}`
          );

        } catch {

          router.replace(
            "/documents"
          );

        }

      };

    generate();

  }, []);

  return (
    <ExamLoading />
  );
}