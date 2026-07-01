"use client";

import { useEffect, useRef } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import ExamLoading from "@/features/exams/components/exam-loading";
import { useGenerateExam } from "@/features/exams/use-generate-exam";
import { ExamDifficulty } from "@/features/exams/types";

export default function GeneratingExamPage() {

  const router = useRouter();

  const params = useSearchParams();

  const mutation = useGenerateExam();

  // Prevent duplicate generation in React Strict Mode
  const started = useRef(false);

  useEffect(() => {

    if (started.current) {
      return;
    }

    started.current = true;

    const documentId = params.get("documentId");
    const title = params.get("title");

    const questionCount =
      Number(params.get("questionCount")) || 10;

    const difficulty =
      (params.get("difficulty") ??
        "adaptive") as ExamDifficulty;

    if (!documentId || !title) {

      router.replace("/documents");

      return;

    }

    const generate = async () => {

      try {

        const exam =
          await mutation.mutateAsync({

            documentId,

            title,

            questionCount,

            difficulty,

          });

        router.replace(
          `/exams/${exam._id}`
        );

      } catch (error) {

        console.error(error);

        router.replace("/documents");

      }

    };

    generate();

  }, [mutation, params, router]);

  return <ExamLoading />;

}