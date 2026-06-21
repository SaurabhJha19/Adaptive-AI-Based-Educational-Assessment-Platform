import {
  GeneratedQuestion,
} from "../services/question-provider.service";

export const validateQuestion =
  (
    question: GeneratedQuestion
  ): boolean => {

    return (
      !!question.question &&
      Array.isArray(
        question.options
      ) &&
      question.options.length ===
        4 &&
      !!question.answer &&
      !!question.topic &&
      !!question.difficulty
    );
  };