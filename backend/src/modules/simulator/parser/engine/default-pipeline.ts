import { Pipeline } from "./pipeline";
import { StageFactory } from "./stage-factory";

import {
  DownloadStage,
  ExtractStage,
  StructureStage,
  MetadataStage,
  ChunkStage,
  LlmStage,
  MergeStage,
  NormalizeStage,
  ValidateStage,
  PersistStage,
} from "./stages";

export function createDefaultPipeline() {

return new Pipeline(

  StageFactory.create([

    new DownloadStage(),

    new ExtractStage(),

    new StructureStage(),

    new MetadataStage(),

    new ChunkStage(),

    new LlmStage(),

    new MergeStage(),

    new NormalizeStage(),

    new ValidateStage(),

    new PersistStage(),

  ])

);

}