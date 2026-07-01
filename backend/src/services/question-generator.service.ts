import {
  QuestionModel,
} from "../models/question.model";

import {
  retrieveRelevantChunks,
} from "./retrieval.service";

import {
  buildContext,
} from "./context-builder.service";

import {
  getQuestionProvider,
} from "./question-provider-factory.service";

import {
  getExamSettings,
} from "./adaptive-exam.service";

import {
  selectDiverseChunks,
} from "./chunk-selection.service";

import {
  validateQuestion,
} from "../utils/question-validator.util";

import {
  logError,
} from "../utils/logger.util";

export const generateQuestions =
  async ({
    userId,
    documentId,
    examId,
    count = 10,
    difficultyOverride,
  }: {
    userId: string;
    documentId: string;
    examId: string;
    count?: number;
    difficultyOverride?: "easy" | "medium" | "hard";
  }) => {

    try {

      const settings =
        await getExamSettings(
          userId
        );

      const adaptiveQuery =
        settings.topics.length > 0
          ? settings.topics.join(
              " "
            )
          : documentId;

      const chunks =
        await retrieveRelevantChunks(
          userId,
          adaptiveQuery,
          20
        );

      console.log(
        "Retrieved Chunks:",
        chunks.length
      );

      if (
        chunks.length === 0
      ) {

        throw new Error(
          "No chunks found"
        );
      }

      const selectedChunks =
        selectDiverseChunks(
          chunks,
          8
        );

      console.log(
        "Selected Chunks:",
        selectedChunks.length
      );

      const sourceChunkIds =
        selectedChunks.map(
          (chunk) =>
            chunk._id.toString()
        );

      const context =
        buildContext(
          selectedChunks
        );

      const provider =
        getQuestionProvider();

     const difficulty =
          difficultyOverride ??
          settings?.difficulty ??
          "medium"; 

      const generatedQuestions =
        await provider.generateQuestions(
          context,
          difficulty,
          count
        );


      console.log(
        "Generated Questions:",
        generatedQuestions.length
      );

      const validQuestions =
        generatedQuestions.filter(
          validateQuestion
        );

      console.log(
        "Valid Questions:",
        validQuestions.length
      );

      const questions =
        await Promise.all(
          validQuestions.map(
            async (
              generatedQuestion
            ) => {

              return QuestionModel.create({
                userId,
                documentId,
                examId,
                question:
                  generatedQuestion.question,

                options:
                  generatedQuestion.options,

                answer:
                  generatedQuestion.answer,

                difficulty:
                  generatedQuestion.difficulty,

                topic:
                  generatedQuestion.topic,

                explanation:
                  generatedQuestion.explanation ||
                  "No explanation available.",

                sourceChunkIds:
                  generatedQuestion
                    .sourceChunkIds
                    ?.length
                    ? generatedQuestion.sourceChunkIds
                    : sourceChunkIds,

                type:
                  "mcq",
              });
            }
          )
        );

      return questions;

    } catch (error) {

      logError(error);

      throw error;
    }
  };