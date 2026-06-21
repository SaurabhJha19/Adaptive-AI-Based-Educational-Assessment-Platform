export interface ExplainerResponse {

  answer: string;

  sources: {
    chunkId: string;
    documentName: string;
    snippet: string;
  }[];
}

export interface ExplainerProvider {

  explain(
    question: string,
    context: string,
    sources: {
      chunkId: string;
      documentName: string;
      snippet: string;
    }[]
  ): Promise<ExplainerResponse>;
}