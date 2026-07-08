"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminHeader from "@/features/simulator-admin/components/admin-header";
import ExamTable from "@/features/simulator-admin/components/exam-table";
import UploadDialog from "@/features/simulator-admin/components/upload-dialog";
import { useOfficialExams } from "@/features/simulator-admin/hooks/use-official-exams";

import { useAuth } from "@/providers/auth-provider";

export default function SimulatorAdminPage() {
  const router = useRouter();

  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (user?.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [
    authLoading,
    isAuthenticated,
    user,
    router,
  ]);

  const {
    data = [],
    isLoading,
    refetch,
  } = useOfficialExams();

  if (authLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (user?.role !== "admin") {
    return null;
  }

  if (isLoading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <AdminHeader />

      <UploadDialog
        onSuccess={() => {
          refetch();
        }}
      />

      <ExamTable
        exams={data}
        onRefresh={refetch}
      />
    </div>
  );
}