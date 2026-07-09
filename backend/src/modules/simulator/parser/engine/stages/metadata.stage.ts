import { BaseStage } from "./base.stage";
import { detectMetadata } from "../../transformers/metadata/detect-metadata";

export class MetadataStage extends BaseStage {

  name = "metadata";

  async execute(context: any): Promise<void> {

    context.metadata = detectMetadata(
      context.pages
    );

  }

}