import { Readable }
from "stream";

const pdfParse =
  require("pdf-parse");

import {
  getFileStreamFromS3,
}
from "../services/storage/s3.service";

export const extractTextFromPdf =
  async (
    s3Key: string
  ) => {

    const stream =
      await getFileStreamFromS3(
        s3Key
      );

    const chunks:
      Buffer[] = [];

    for await (
      const chunk of
      stream as Readable
    ) {

      chunks.push(
        Buffer.from(chunk)
      );
    }

    const pdfBuffer =
      Buffer.concat(
        chunks
      );

    const pdf =
      await pdfParse(
        pdfBuffer
      );

    return pdf.text;
  };