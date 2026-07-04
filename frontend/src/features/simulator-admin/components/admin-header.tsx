"use client";

import UploadDialog from "./upload-dialog";

export default function AdminHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Official Exam Management
        </h1>

        <p className="text-muted-foreground mt-1">
          Upload, review and publish official simulator exams.
        </p>
      </div>

      <UploadDialog />
    </div>
  );
}