import {
  ParsedDocument,
  DocumentMetadata,
} from "./document.interfaces";

export class DocumentBuilder {

  build(
    metadata: DocumentMetadata
  ): ParsedDocument {

    return {

      metadata,

      pages: [],

    };

  }

}