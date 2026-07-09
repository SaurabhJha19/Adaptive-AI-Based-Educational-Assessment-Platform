import { IOfficialExam } from "../../models/official-exam.model";

export interface ParserContext {

  exam: IOfficialExam;

  pdfBuffer?: Buffer;

  document?: any;

  pages?: any[];

  structure?: any;

  metadata?: any;

  chunkResults?: any[];

  parsedChunks?: any[];

  parsed?: any;

  extractedQuestions?: number;

}