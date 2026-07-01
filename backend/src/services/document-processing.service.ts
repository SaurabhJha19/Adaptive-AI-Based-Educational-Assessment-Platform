import {
  extractTextFromPdf
} from "./pdf.service";

import {
  splitIntoParagraphs
} from "./chunk.service";

import {
  saveChunks
} from "./document-chunk.service";

import {
  updateDocumentStatus
} from "./document.service";

export const processDocument =
  async (
    documentId: string,
    userId: string,
    s3Key: string
  ) => {

    try {

      await updateDocumentStatus(
        documentId,
        "processing"
      );

      const text =
        await extractTextFromPdf(
          s3Key
        );

      const chunks =
        splitIntoParagraphs(text);

      await saveChunks({
        documentId,
        userId,
        chunks,
      });

      await updateDocumentStatus(
        documentId,
        "processed"
      );

    } catch (error) {

      await updateDocumentStatus(
        documentId,
        "failed"
      );

      throw error;
    }
  };