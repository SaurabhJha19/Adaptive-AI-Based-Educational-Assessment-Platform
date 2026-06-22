"use client";

import {
  Document,
} from "@/types/document";

import {
  useDocuments,
} from "@/features/documents/use-documents";

import {
  useUploadDocument,
} from "@/features/documents/use-upload-document";

import {
  useGenerateExam,
} from "@/features/exams/use-generate-exam";

export default function DocumentsPage() {

  const {
    data,
    isLoading,
    refetch,
  } = useDocuments();

  const uploadMutation =
    useUploadDocument();

  const generateExam =
    useGenerateExam();

  const handleUpload =
    async (
      event:
        React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      try {

        await uploadMutation.mutateAsync(
          file
        );

        await refetch();

      } catch (
        error
      ) {

        console.error(
          error
        );
      }
    };

  const handleGenerateExam =
    async (
      documentId: string
    ) => {

      try {

        await generateExam.mutateAsync(
          documentId
        );

        alert(
          "Exam generated successfully!"
        );

      } catch (
        error
      ) {

        console.error(
          error
        );

        alert(
          "Failed to generate exam."
        );
      }
    };

  return (
    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Documents
      </h1>

      <input
        type="file"
        accept=".pdf"
        onChange={
          handleUpload
        }
      />

      {uploadMutation.isPending && (
        <p className="mt-4">
          Uploading...
        </p>
      )}

      <div className="mt-6">

        {isLoading && (
          <p>
            Loading documents...
          </p>
        )}

        {!isLoading &&
          data?.documents?.length === 0 && (
            <p>
              No documents uploaded yet.
            </p>
          )}

        {data?.documents?.map(
          (
            document: Document
          ) => (

            <div
              key={
                document._id
              }
              className="
              border
              rounded-lg
              p-4
              mb-4
              "
            >

              <h2
                className="
                font-semibold
                "
              >
                {
                  document.originalName
                }
              </h2>

              <p
                className="
                text-sm
                text-gray-500
                "
              >
                Status:
                {" "}
                {
                  document.status
                }
              </p>

              <button
                onClick={() =>
                  handleGenerateExam(
                    document._id
                  )
                }
                disabled={
                  generateExam.isPending
                }
                className="
                mt-3
                border
                rounded
                px-3
                py-1
                "
              >
                {
                  generateExam.isPending
                    ? "Generating..."
                    : "Generate Exam"
                }
              </button>

            </div>
          )
        )}

      </div>

    </div>
  );
}