import { IOfficialExam } from "../../../models/official-exam.model";

import { downloadPdf } from "./download-pdf";
import { extractText } from "./extract-text";
import { splitPages } from "./split-pages";
import { detectMetadata } from "./detect-metadata";
import { detectStructure } from "./detect-structure";
import { buildChunks } from "./chunk-builder";
import { llmExtract } from "./llm-extract";
import { normalizeExam } from "./normalize";
import { validateExam } from "./validate";
import { persistExam } from "./persist";

class SatParserPipeline {
  async execute(exam: IOfficialExam): Promise<IOfficialExam> {
    const pdfBuffer = await downloadPdf(exam.pdfKey);

    const extracted = await extractText(pdfBuffer);

    const pages = splitPages(extracted.text);

    const metadata = detectMetadata(pages);

    const structure = detectStructure(pages);

    const chunks = buildChunks(structure);

    const parsed =
    await llmExtract(chunks);

    const normalized =
    normalizeExam(
        parsed,
        metadata,
        exam
    );

    validateExam(normalized);

    return persistExam(
    normalized
    );
  }
}

export default new SatParserPipeline();