import { BaseStage } from "./base.stage";
import { validateExam } from "../../sat/pipeline/validate";

export class ValidateStage extends BaseStage {

  name = "validate";

  async execute(context: any): Promise<void> {

    validateExam(context.exam);

  }

}