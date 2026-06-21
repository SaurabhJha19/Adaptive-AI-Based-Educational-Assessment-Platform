import { env }
from "../config/env";

import {
  MockExplainerProvider,
} from "./mock-explainer-provider.service";

import {
  OpenAIExplainerProvider,
} from "./openai-explainer-provider.service";

export const getExplainerProvider =
  () => {

    if (
      !env.OPENAI_API_KEY ||
      env.OPENAI_API_KEY ===
        "API_PENDING_KEY"
    ) {

      return new MockExplainerProvider();
    }

    return new OpenAIExplainerProvider();
  };