"use client";

import AdminHeader from "@/features/simulator-admin/components/admin-header";
import ExamTable from "@/features/simulator-admin/components/exam-table";
import UploadDialog from "@/features/simulator-admin/components/upload-dialog";
import { useOfficialExams } from "@/features/simulator-admin/hooks/use-official-exams";

export default function SimulatorAdminPage() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useOfficialExams();

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