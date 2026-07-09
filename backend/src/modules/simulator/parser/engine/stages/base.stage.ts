import { ParserContext } from "../parser-context";
import { ParserStage } from "../parser-engine";

export abstract class BaseStage
implements ParserStage {

  abstract name: string;

  abstract execute(
    context: ParserContext
  ): Promise<void>;

  protected log(
    message: string
  ) {

    console.log(
      `[${this.name}] ${message}`
    );

  }

}