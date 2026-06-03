import fs from "fs";

const pdfParse = require("pdf-parse");

export const extractTextFromPdf =
  async (filePath: string) => {

    const pdfBuffer =
      fs.readFileSync(filePath);

    const pdfData =
      await pdfParse(pdfBuffer);

    return pdfData.text;
  };