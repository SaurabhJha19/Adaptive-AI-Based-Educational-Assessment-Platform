import llm from "./llm.service";

export class SimulatorIngestionService {
  async ingest(
    extractedText: string
  ) {
    const parsed =
      await llm.extract(
        extractedText
      );

    return parsed;
  }
}

export default new SimulatorIngestionService();