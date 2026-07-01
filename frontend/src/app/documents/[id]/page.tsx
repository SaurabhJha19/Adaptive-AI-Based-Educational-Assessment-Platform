"use client";

import { useParams } from "next/navigation";

import {
  useDocument,
} from "@/features/documents/use-document";

export default function DocumentDetailsPage() {

  const params =
    useParams();

  const {
    data,
    isLoading,
  } = useDocument(
    params.id as string
  );

  if (isLoading) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  const document =
    data.document;

  return (

    <div className="space-y-8">

      <h1 className="text-3xl font-bold">

        {document.originalName}

      </h1>

      <div className="grid grid-cols-4 gap-4">

        <div className="rounded-lg border p-4">
          Status
        </div>

        <div className="rounded-lg border p-4">
          Size
        </div>

        <div className="rounded-lg border p-4">
          Chunks
        </div>

        <div className="rounded-lg border p-4">
          Uploaded
        </div>

      </div>

    </div>

  );
}