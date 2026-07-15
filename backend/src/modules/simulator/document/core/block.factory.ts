import { randomUUID } from "crypto";

import {
  AnyBlock,
  BoundingBox,
  Provenance,
} from "./document.interfaces";

import {
  BlockType,
  ContentLayer,
  CoordinateOrigin,
} from "./document.types";

export function createBoundingBox(
    bbox: any
): BoundingBox {

    const left = Math.min(
        bbox?.l ?? 0,
        bbox?.r ?? 0
    );

    const right = Math.max(
        bbox?.l ?? 0,
        bbox?.r ?? 0
    );

    const rawTop = bbox?.t ?? 0;
    const rawBottom = bbox?.b ?? 0;

    const origin =
        bbox?.coord_origin === "TOPLEFT"
            ? CoordinateOrigin.TOPLEFT
            : CoordinateOrigin.BOTTOMLEFT;

    let top: number;
    let bottom: number;

    if (origin === CoordinateOrigin.TOPLEFT) {

        top = Math.min(rawTop, rawBottom);
        bottom = Math.max(rawTop, rawBottom);

    } else {

        // Bottom-left coordinate system:
        // larger Y = visually higher.
        // Normalize so every consumer sees:
        // top < bottom

        top = Math.min(rawTop, rawBottom);
        bottom = Math.max(rawTop, rawBottom);

    }

    return {

        left,
        right,
        top,
        bottom,
        origin,

    };

}

export function createProvenance(
  prov: any
): Provenance {

  return {

    page:
      prov.page_no,

    bbox:
      createBoundingBox(
        prov.bbox
      ),

    charStart:
      prov.charspan?.[0] ?? 0,

    charEnd:
      prov.charspan?.[1] ?? 0,

  };

}

export function createBaseBlock(
  type: BlockType,
  layer: ContentLayer,
  ref: string,
  page: number,
  text: string,
  originalText: string,
  provenance: Provenance[]
): AnyBlock {

  return {

    id: randomUUID(),

    ref,

    type,

    layer,

    page,

    text,

    originalText,

    provenance,

  } as AnyBlock;

}