import { ParsedExam } from "../types/parsed-exam";

export class SimulatorLLMService {
  async extract(
    text: string
  ): Promise<ParsedExam> {
    throw new Error(
      "Not implemented"
    );
  }
}

export default new SimulatorLLMService();