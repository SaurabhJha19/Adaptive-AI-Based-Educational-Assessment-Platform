export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UDMStyle {
  fontFamily?: string;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
}

export interface UDMNode {
  id: string;

  type: string;

  page: number;

  text?: string;

  bbox?: BoundingBox;

  style?: UDMStyle;

  metadata: Record<string, unknown>;

  children: UDMNode[];
}

export interface UDMPage {
  pageNumber: number;

  width?: number;

  height?: number;

  nodes: UDMNode[];
}

export interface UDMDocument {

  id: string;

  title?: string;

  pages: UDMPage[];

  readingOrder: UDMNode[];

  metadata: Record<string, unknown>;

}