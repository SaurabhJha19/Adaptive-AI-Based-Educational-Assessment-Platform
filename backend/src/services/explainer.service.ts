import {
  retrieveRelevantChunks,
} from "./retrieval.service";

import {
  buildContext,
} from "./context-builder.service";

import {
  getExplainerProvider,
} from "./explainer-provider-factory.service";

import {
  DocumentModel,
} from "../models/document.model";

export const explainQuestion =
  async ({
    userId,
    question,
  }: {
    userId: string;
    question: string;
  }) => {

    const chunks =
      await retrieveRelevantChunks(
        userId,
        question,
        5
      );

    if (
      chunks.length === 0
    ) {

      throw new Error(
        "No relevant content found"
      );
    }

    const context =
      buildContext(chunks);

    const sources =
      await Promise.all(

        chunks.map(
          async (chunk) => {

            const document =
              await DocumentModel.findById(
                chunk.documentId
              );

            return {
              chunkId:
                chunk._id.toString(),

              documentName:
                document
                  ?.originalName ||
                "Unknown Document",

              snippet:
                chunk.content.length >
                200
                  ? chunk.content.substring(
                      0,
                      200
                    ) + "..."
                  : chunk.content,
            };
          }
        )
      );

    const provider =
      getExplainerProvider();

    return provider.explain(
      question,
      context,
      sources
    );
  };