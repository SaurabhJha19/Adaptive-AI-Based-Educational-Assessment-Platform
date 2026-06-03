import { extractTextFromPdf }
from "../services/pdf.service";

import { splitIntoParagraphs }
from "../services/chunk.service";

export const testPdfExtraction =
  async () => {

    const filePath =
      "F:\\Agentic AI Toefl Project\\Project Code\\backend\\uploads\\6a1f8ca08c61ce52ec3b9722\\1780474592039-256911785-GRE Writing - Google Docs.pdf";

    const text =
      await extractTextFromPdf(
        filePath
      );

    const chunks =
      splitIntoParagraphs(text);

    console.log(
      "\n=== CHUNK COUNT ===\n"
    );

    console.log(chunks.length);

    console.log(
      "\n=== FIRST 5 CHUNKS ===\n"
    );

    console.log(
      chunks.slice(0, 5)
    );

    console.log(
      text.substring(0, 2000)
    );
  };