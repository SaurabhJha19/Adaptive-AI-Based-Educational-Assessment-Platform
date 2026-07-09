import { ExamParserAdapter } from "./adapter.interface";
import { SatAdapter } from "./sat";

export class AdapterRegistry {

  private static readonly adapters =
    new Map<string, ExamParserAdapter>([
      ["SAT", new SatAdapter()],
    ]);

  static get(
    examType: string
  ): ExamParserAdapter {

    const adapter =
      this.adapters.get(
        examType.toUpperCase()
      );

    if (!adapter) {

      throw new Error(
        `No parser adapter registered for ${examType}`
      );

    }

    return adapter;

  }

}