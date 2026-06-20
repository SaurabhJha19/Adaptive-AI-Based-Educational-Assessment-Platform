import { env }
from "../config/env";

import {
  MockQuestionProvider,
}
from "./mock-question-provider.service";

import {
  OpenAIQuestionProvider,
}
from "./openai-question-provider.service";

export const getQuestionProvider =
  () => {

    if (
      env.QUESTION_MODEL ===
      "GPT_PENDING_KEY"
    ) {

      return new MockQuestionProvider();
    }

    return new OpenAIQuestionProvider();
  };