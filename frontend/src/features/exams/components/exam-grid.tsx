"use client";

import { Exam } from "../types";
import ExamCard from "./exam-card";

type Props = {
  exams: Exam[];
};

export default function ExamGrid({
  exams,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
      {exams.map((exam) => (
        <ExamCard
          key={exam._id}
          exam={exam}
        />
      ))}
    </div>
  );
}