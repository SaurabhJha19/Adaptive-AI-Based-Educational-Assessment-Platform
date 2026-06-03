import { extractTextFromPdf }
from "../services/pdf.service";

export const testPdfExtraction =
  async () => {

    const filePath =
      "F:\\Agentic AI Toefl Project\\Project Code\\backend\\uploads\\6a1f8ca08c61ce52ec3b9722\\1780470887966-621776404-1779013994793.pdf";

    const text =
      await extractTextFromPdf(
        filePath
      );

    console.log(
      "\n=== PDF TEXT ===\n"
    );

    console.log(
      text.substring(0, 2000)
    );
  };