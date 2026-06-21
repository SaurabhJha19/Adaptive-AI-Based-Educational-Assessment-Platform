import {
  ExplainerProvider,
  ExplainerResponse,
} from "./explainer-provider.service";

export class MockExplainerProvider
  implements ExplainerProvider {

  async explain(
    question: string,
    context: string,
    sources: {
      chunkId: string;
      documentName: string;
      snippet: string;
    }[]
  ): Promise<ExplainerResponse> {

    return {
      answer:
        `Mock explanation based on retrieved notes.\n\n${context.substring(
          0,
          500
        )}`,

      sources,
    };
  }
}