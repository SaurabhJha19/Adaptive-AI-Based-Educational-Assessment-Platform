"use client";

import {
  useParams,
} from "next/navigation";

import {
  useExam,
} from "@/features/exams/use-exam";

import ExamPlayer
from "@/features/exams/components/exam-player";

export default function ExamPlayerPage() {

  const params =
    useParams();

  const {

    data: exam,

    isLoading,

  } = useExam(
    params.id as string
  );

  if (isLoading) {

    return (
      <div className="p-8">
        Loading...
      </div>
    );

  }

  if (!exam) {

    return (
      <div className="p-8">
        Exam not found
      </div>
    );

  }

  return (
    <ExamPlayer
      exam={exam}
    />
  );

}