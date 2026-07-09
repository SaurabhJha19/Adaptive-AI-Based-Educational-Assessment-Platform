import { IOfficialExam } from "../../../models/official-exam.model";

import { downloadPdf } from "./download-pdf";
import { extractText } from "./extract-text";
import { detectMetadata } from "./detect-metadata";
import { detectStructure } from "./detect-structure";
import { llmExtract } from "./llm-extract";
import { normalizeExam } from "./normalize";
import { validateExam } from "./validate";
import { persistExam } from "./persist";
import { mapLlmResponse } from "../../core/map-llm-response";
import { chunkModule } from "../../core/chunk-module";
import { mergeChunks } from "../../core/merge-chunks";
import { deduplicate } from "../../core/deduplicate";

class SatParserPipeline {
  async execute(
    exam: IOfficialExam
  ): Promise<IOfficialExam> {

    console.log("================================");
    console.log("STARTING SAT PARSER");
    console.log("================================");

    const pdfBuffer =
      await downloadPdf(exam.pdfUrl);

    const pages =
      await extractText(pdfBuffer);

    const structure =
        detectStructure(pages as any);

    console.log(
        `Detected Modules: ${structure.modules.length}`
    );

    const metadata =
      detectMetadata(pages as any);

    const chunkResults: any[] = [];

    let extractedQuestions = 0;

    for (const module of structure.modules) {

      console.log("");
      console.log(
        `========== ${module.title} ==========`
      );

      const chunks =
        chunkModule(module, 3);

      console.log(
        `Chunks: ${chunks.length}`
      );

      for (const chunk of chunks) {

        console.log("");
        console.log(
          `[${chunk.moduleTitle}] Chunk ${chunk.chunkIndex}/${chunk.totalChunks}`
        );

        console.log(
          `Pages ${chunk.startPage}-${chunk.endPage}`
        );

          const raw =
              await llmExtract(
                  chunk,
                  extractedQuestions
              );
              
          
          const parsed =
              mapLlmResponse(

                  raw,

                  chunk.moduleTitle,

                  chunk.moduleIndex

              );

        const chunkQuestions =
          parsed.sections
            ?.flatMap(
              (section: any) =>
                section.questionGroups ?? []
            )
            ?.flatMap(
              (group: any) =>
                group.questions ?? []
            )
            ?.length ?? 0;

        console.log(
          `Extracted ${chunkQuestions} questions`
        );

        extractedQuestions +=
          chunkQuestions;

        console.log(
          `Running Total: ${extractedQuestions}`
        );

        chunkResults.push(parsed);

      }

    }

    console.log("");
    console.log("Merging chunks...");

    let parsed =
      mergeChunks(chunkResults);

    console.log("Deduplicating...");

    parsed =
      deduplicate(parsed);

    console.log("Normalizing...");

    parsed =
      normalizeExam(
        parsed,
        metadata,
        exam
      );

    console.log("");
    console.log("================================");
    console.log(
      `TOTAL QUESTIONS: ${exam.totalQuestions}`
    );

    for (const section of parsed.sections) {

      const count =
        section.questionGroups.reduce(
          (
            total: number,
            group: any
          ) =>
            total +
            (group.questions?.length ?? 0),
          0
        );

      console.log(
        `${section.title}: ${count}`
      );

    }

    console.log("================================");

      validateExam(exam);

      await persistExam(exam);

      return exam;

  }
}

export default new SatParserPipeline();