import { BaseStage } from "./base.stage";
import { detectStructure } from "../../transformers/structure/detect-structure";

export class StructureStage extends BaseStage {

  name = "structure";

  async execute(context: any): Promise<void> {

    context.structure = detectStructure(
      context.pages
    );

  }

}