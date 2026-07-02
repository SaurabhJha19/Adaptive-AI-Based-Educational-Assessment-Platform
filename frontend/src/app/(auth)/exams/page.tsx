"use client";

import { useMemo } from "react";
import { ClipboardList, CheckCircle2, Clock3, Trophy } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import PageHeader from "@/components/ui/page-header";
import StatCard from "@/components/ui/stat-card";
import SectionCard from "@/components/ui/section-card";

import { useExams } from "@/features/exams/use-exams";

import ExamGrid from "@/features/exams/components/exam-grid";
import ExamToolbar from "@/features/exams/components/exam-toolbar";
import EmptyState from "@/features/exams/components/empty-state";

import { Exam } from "@/features/exams/types";

export default function ExamsPage() {
  const {
    data: exams = [],
    isLoading,
  } = useExams();

  const stats = useMemo(() => {
    const completed = exams.filter(
      (e: Exam) => e.status === "completed"
    ).length;

    const pending = exams.filter(
      (e: Exam) => e.status !== "completed"
    ).length;

    return {
      total: exams.length,
      completed,
      pending,
      average: completed === 0 ? 0 : 82,
    };
  }, [exams]);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="py-20 text-center">
          Loading exams...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>

      <PageHeader
        title="My Exams"
        description="Manage and complete your AI-generated assessments."
      />

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Exams"
          value={stats.total}
          subtitle="Generated"
          icon={ClipboardList}
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          subtitle="Finished"
          icon={CheckCircle2}
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          subtitle="Waiting"
          icon={Clock3}
        />

        <StatCard
          title="Average Score"
          value={`${stats.average}%`}
          subtitle="Overall"
          icon={Trophy}
        />

      </div>

      <SectionCard title="Exam Library">

        <ExamToolbar />

        {exams.length === 0 ? (
          <EmptyState />
        ) : (
          <ExamGrid exams={exams} />
        )}

      </SectionCard>

    </PageContainer>
  );
}