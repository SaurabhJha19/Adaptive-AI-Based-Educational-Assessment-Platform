"use client";

import { Upload } from "lucide-react";

type Props = {
  onSelect: (
    file: File
  ) => void;
};

export default function UploadButton({
  onSelect,
}: Props) {

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border px-4 py-2 hover:bg-muted transition">

      <Upload size={18} />

      <span>Upload PDF</span>

      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {

          const file =
            e.target.files?.[0];

          if (file) {
            onSelect(file);
          }

        }}
      />

    </label>
  );
}