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
    const published  = exams.filter(
      (e: Exam) => e.status === "published"
    ).length;

    const draft = exams.filter(
      (e: Exam) => e.status === "draft"
    ).length;

    return {
      total: exams.length,
      published ,
      draft,
      average: published  === 0 ? 0 : 82,
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
        title="AI Assessment"
        description="Generate and manage personalized assessments from your uploaded study material."
      />

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Exams"
          value={stats.total}
          subtitle="Generated"
          icon={ClipboardList}
        />

        <StatCard
          title="published "
          value={stats.published }
          subtitle="Finished"
          icon={CheckCircle2}
        />

        <StatCard
          title="draft"
          value={stats.draft}
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