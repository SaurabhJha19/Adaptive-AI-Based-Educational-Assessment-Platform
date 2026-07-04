import pdfParse from "pdf-parse";

export interface ExtractedPdf {
  text: string;
  pageCount: number;
}

export async function extractText(
  pdf: Buffer
): Promise<ExtractedPdf> {

  const parsed = await pdfParse(pdf);

  return {
    text: parsed.text,
    pageCount: parsed.numpages,
  };
}