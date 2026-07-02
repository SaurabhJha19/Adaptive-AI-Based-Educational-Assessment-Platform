import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

type DocumentItem = {
  id: string;
  title: string;
  status: "processed" | "processing" | "failed";
  uploadedAt: string;
};

type Props = {
  documents: DocumentItem[];
};

export default function RecentDocuments({
  documents,
}: Props) {
  return (
    <div className="space-y-4">

      {documents.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed text-muted-foreground">
          No documents uploaded yet.
        </div>
      ) : (
        documents.map((document) => (
          <div
            key={document.id}
            className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-muted/50"
          >
            <div className="flex items-center gap-4">

              <div className="rounded-lg bg-primary/10 p-3">
                <FileText className="h-5 w-5 text-primary" />
              </div>

              <div>

                <h3 className="font-medium">
                  {document.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {document.status}
                </p>

              </div>

            </div>

            <Link
              href="/documents"
              className="rounded-lg p-2 hover:bg-muted"
            >
              <ArrowRight className="h-5 w-5" />
            </Link>

          </div>
        ))
      )}

    </div>
  );
}