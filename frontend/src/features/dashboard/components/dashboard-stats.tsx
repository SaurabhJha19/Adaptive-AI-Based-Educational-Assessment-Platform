"use client";

import {
  BookOpen,
  Clock3,
  FileText,
  Trophy,
} from "lucide-react";

import StatCard from "@/components/shared/stat-card";
import { DashboardStats as DashboardStatsType } from "../types";

type Props = {
  stats: DashboardStatsType;
};

export default function DashboardStats({
  stats,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Documents"
        value={stats.documentCount}
        subtitle="Uploaded"
        icon={FileText}
      />

      <StatCard
        title="Assessments"
        value={stats.examCount}
        subtitle="Generated"
        icon={BookOpen}
      />

      <StatCard
        title="Average Score"
        value={`${stats.averageScore}%`}
        icon={Trophy}
      />

      <StatCard
        title="Study Hours"
        value={`${stats.studyHours}h`}
        icon={Clock3}
      />
    </div>
  );
}