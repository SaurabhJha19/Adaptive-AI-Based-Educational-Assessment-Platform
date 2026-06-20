import mongoose from "mongoose";

import { env }
from "../config/env";

import { connectDB }
from "../config/database";

import {
  DocumentChunkModel
}
from "../models/document-chunk.model";

import {
  generateEmbedding
}
from "../services/embedding.service";

const reembed =
  async () => {

    await connectDB();

    const chunks =
      await DocumentChunkModel.find();

    console.log(
      `Found ${chunks.length} chunks`
    );

    for (
      const chunk
      of chunks
    ) {

      const embedding =
        await generateEmbedding(
          chunk.content
        );

      chunk.embedding =
        embedding;

      await chunk.save();

      console.log(
        `Updated chunk ${chunk._id}`
      );
    }

    console.log(
      "Finished"
    );

    await mongoose.disconnect();
  };

reembed().catch(
  console.error
);