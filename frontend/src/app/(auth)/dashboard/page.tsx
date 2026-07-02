import {
  BookOpen,
  ClipboardList,
  TrendingUp,
  Clock,
} from "lucide-react";

import PageContainer from "@/components/layout/page-container";

import StatCard from "@/components/ui/stat-card";
import SectionCard from "@/components/ui/section-card";

import DashboardHero from "@/components/dashboard/dashboard-hero";
import QuickActions from "@/components/dashboard/quick-actions";
import PerformanceChart from "@/components/dashboard/performance-chart";
import RecentDocuments from "@/components/dashboard/recent-documents";

import RecentExams from "@/components/dashboard/recent-exams";

export default function DashboardPage() {
  // Temporary mock data
  // Will be replaced with API data in the next sprint.
  const recentDocuments = [
    {
      id: "1",
      title: "Operating Systems.pdf",
      status: "processed" as const,
      uploadedAt: "Today",
    },
    {
      id: "2",
      title: "Computer Networks.pdf",
      status: "processed" as const,
      uploadedAt: "Yesterday",
    },
    {
      id: "3",
      title: "DBMS Notes.pdf",
      status: "processing" as const,
      uploadedAt: "2 days ago",
    },
  ];

  const recentExams = [
  {
    id: "1",
    title: "TOEFL Reading",
    score: 86,
    difficulty: "Adaptive",
    completedAt: "Today",
  },
  {
    id: "2",
    title: "GRE Verbal",
    score: 79,
    difficulty: "Medium",
    completedAt: "Yesterday",
  },
];

  return (
    <PageContainer>

      {/* Hero */}
      <DashboardHero />

      {/* Quick Actions */}
      <QuickActions />

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Documents"
          value={0}
          subtitle="Uploaded"
          icon={BookOpen}
        />

        <StatCard
          title="Exams"
          value={0}
          subtitle="Completed"
          icon={ClipboardList}
        />

        <StatCard
          title="Average Score"
          value="0%"
          subtitle="Overall"
          icon={TrendingUp}
        />

        <StatCard
          title="Study Hours"
          value={0}
          subtitle="Tracked"
          icon={Clock}
        />

      </div>

      {/* Middle Section */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <SectionCard title="Performance Trend">

          <PerformanceChart />

        </SectionCard>

        <SectionCard title="AI Recommendation">

          <div className="space-y-4">

            <div className="rounded-xl border bg-primary/5 p-5">

              <h3 className="mb-2 font-semibold">

                🤖 AI Study Recommendation

              </h3>

              <p className="text-sm leading-6 text-muted-foreground">

                Complete more exams to receive personalized
                recommendations based on your strengths,
                weaknesses and learning progress.

              </p>

            </div>

            <div className="rounded-xl border border-dashed p-4">

              <p className="text-sm text-muted-foreground">

                Recommendation engine will be enabled in Version 2.

              </p>

            </div>

          </div>

        </SectionCard>

      </div>

      {/* Bottom Section */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <SectionCard title="Recent Documents">

          <RecentDocuments
            documents={recentDocuments}
          />

        </SectionCard>

        <SectionCard title="Recent Exams">

            <RecentExams
                exams={recentExams}
            />

        </SectionCard>

      </div>

    </PageContainer>
  );
}