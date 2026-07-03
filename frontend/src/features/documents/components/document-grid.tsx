import { Document } from "@/types/document";

import DocumentCard from "./document-card";

type Props = {
  documents: Document[];
  onDelete?: (id: string) => void;
};

export default function DocumentGrid({
  documents,
  onDelete,
}: Props) {

  if (documents.length === 0) {

    return (
      <div className="rounded-xl border border-dashed p-16 text-center">

        <h2 className="text-xl font-semibold">
          No Documents
        </h2>

        <p className="mt-2 text-muted-foreground">
          Upload your first PDF to generate
          AI-powered exams.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {documents.map((document) => (

        <DocumentCard
          key={document._id}
          document={document}
          onDelete={onDelete}
        />

      ))}

    </div>
  );
}