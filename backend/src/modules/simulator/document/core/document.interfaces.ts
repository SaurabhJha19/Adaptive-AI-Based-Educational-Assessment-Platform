import {
  BlockType,
  ContentLayer,
  CoordinateOrigin,
} from "./document.types";

export interface BoundingBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
  origin: CoordinateOrigin;
}

export interface Provenance {
  page: number;
  bbox: BoundingBox;
  charStart: number;
  charEnd: number;
}

export interface DocumentBlock {

  id: string;

  ref: string;

  type: BlockType;

  layer: ContentLayer;

  page: number;

  text: string;

  originalText?: string;

  provenance: Provenance[];

}

export interface TextBlock extends DocumentBlock {}

export interface FormulaBlock extends DocumentBlock {

  latex?: string;

}

export interface ListItem {

  marker?: string;

  text: string;

  enumerated: boolean;

}

export interface ListBlock extends DocumentBlock {

  items: ListItem[];

}

export interface FigureBlock extends DocumentBlock {

  captions: string[];

  references: string[];

  extractedText: string[];

}

export interface TableCell {

  row: number;

  column: number;

  rowSpan: number;

  colSpan: number;

  text: string;

  isColumnHeader: boolean;

  isRowHeader: boolean;

}

export interface TableBlock extends DocumentBlock {

  rows: TableCell[][];

}

export type AnyBlock =
  | TextBlock
  | FormulaBlock
  | ListBlock
  | FigureBlock
  | TableBlock;

export interface DocumentPage {

    pageNumber: number;

    width?: number;

    height?: number;

    isBlank: boolean;

    blocks: AnyBlock[];

}

export interface DocumentMetadata {

  source: "docling";

  title?: string;

  pageCount: number;

}

export interface ParsedDocument {

  metadata: DocumentMetadata;

  pages: DocumentPage[];

}