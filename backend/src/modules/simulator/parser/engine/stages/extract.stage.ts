import { BaseStage } from "./base.stage";
import { extractText } from "../../extractors/pdf/extract-text";

export class ExtractStage extends BaseStage {

  name = "extract";

  async execute(context: any): Promise<void> {

    context.document = await extractText(
      context.pdfBuffer
    );

    context.pages = context.document.pages.map(
      (page: any) => ({
        page: page.page,
        content: page.blocks
          .map((block: any) => block.text)
          .join("\n"),
      })
    );

  }

}