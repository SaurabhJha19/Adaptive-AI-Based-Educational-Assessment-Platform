import { BaseStage } from "./base.stage";
import { downloadPdf } from "../../extractors/pdf/download-pdf";

export class DownloadStage extends BaseStage {

  name = "download";

  async execute(context: any): Promise<void> {

    context.pdfBuffer = await downloadPdf(
      context.exam.pdfUrl
    );

  }

}