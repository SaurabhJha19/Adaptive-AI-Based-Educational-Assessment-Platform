"use client";

import PageContainer from "@/components/shared/page-container";

import DashboardHero from "@/features/dashboard/components/dashboard-hero";
import DashboardStats from "@/features/dashboard/components/dashboard-stats";
import QuickActions from "@/features/dashboard/components/quick-actions";
import ContinueLearning from "@/features/dashboard/components/continue-learning";
import RecommendationSection from "@/features/dashboard/components/recommendation-section";
import PerformanceSection from "@/features/dashboard/components/performance-section";
import RecentDocuments from "@/features/dashboard/components/recent-documents";
import RecentActivity from "@/features/dashboard/components/recent-activity";

import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";

export default function DashboardPage() {

    const {

        data,

        isLoading,

        isError,

    } = useDashboard();

    if (isLoading) {

        return (

            <PageContainer>

                Loading dashboard...

            </PageContainer>

        );

    }

    if (isError || !data) {

        return (

            <PageContainer>

                Failed to load dashboard.

            </PageContainer>

        );

    }

    return (

        <PageContainer>

            <DashboardHero

                profile={data.profile}

            />

            <DashboardStats

                stats={data.stats}

            />

            <QuickActions />

            <div className="grid gap-6 xl:grid-cols-2">

                <ContinueLearning

                    attempt={data.continueLearning}

                />

                <RecommendationSection

                    recommendation={

                        data.recommendations?.[0]

                    }

                />

            </div>

            <div className="grid gap-6 xl:grid-cols-2">

                <PerformanceSection

                    recentExams={data.recentExams}

                />

                <RecentDocuments

                    documents={data.recentDocuments}

                />

            </div>

            <RecentActivity

                activity={data.recentExams}

            />

        </PageContainer>

    );

}