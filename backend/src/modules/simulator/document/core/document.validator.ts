import { ParsedDocument } from "./document.interfaces";

export class DocumentValidator {

  validate(
    document: ParsedDocument
  ) {

    if (
      !document.pages.length
    ) {

      throw new Error(
        "Document contains no pages."
      );

    }

    for (
      const page of document.pages
    ) {

      if (
        page.blocks.length === 0
      ) {

        console.warn(
          `Page ${page.pageNumber} has no blocks.`
        );

      }

    }

    return true;

  }

}