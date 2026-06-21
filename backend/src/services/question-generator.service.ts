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

export const generateQuestions =
  async ({
    userId,
    documentId,
    count = 5,
  }: {
    userId: string;
    documentId: string;
    count?: number;
  }) => {

    const settings =
      await getExamSettings(
        userId
      );

    const adaptiveQuery =
      settings.topics.length > 0
        ? settings.topics.join(" ")
        : documentId;

    const chunks =
      await retrieveRelevantChunks(
        userId,
        adaptiveQuery,
        20
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

    const context =
      buildContext(
        selectedChunks
      );

    const provider =
      getQuestionProvider();

    const generatedQuestions =
      await provider.generateQuestions(
        context,
        settings.difficulty,
        count
      );

    const questions =
      await Promise.all(
        generatedQuestions.map(
          async (
            generatedQuestion
          ) => {

            return QuestionModel.create({
              userId,
              documentId,

              question:
                generatedQuestion.question,

              options:
                generatedQuestion.options,

              answer:
                generatedQuestion.answer,

              explanation:
                "Generated via provider",

              difficulty:
                generatedQuestion.difficulty,

              topic:
                generatedQuestion.topic,

              type:
                "mcq",
            });
          }
        )
      );

    return questions;
  };