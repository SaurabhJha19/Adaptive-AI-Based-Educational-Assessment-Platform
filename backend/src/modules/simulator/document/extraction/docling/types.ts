export interface DoclingDocument {

  name?: string;

  body: {

    children: DoclingRef[];

  };

  texts: DoclingText[];

  groups: DoclingGroup[];

  pictures: DoclingPicture[];

  tables: DoclingTable[];

}

export interface DoclingRef {

  $ref: string;

}

export interface DoclingGroup {

  self_ref: string;

  label: string;

  name: string;

  children: DoclingRef[];

}

export interface DoclingText {

  self_ref: string;

  label: string;

  content_layer: string;

  text: string;

  orig: string;

  marker?: string;

  enumerated?: boolean;

  level?: number;

  prov: any[];

}

export interface DoclingPicture {

  self_ref: string;

  label: string;

  captions: any[];

  references: any[];

  prov: any[];

}

export interface DoclingTable {

  self_ref: string;

  label: string;

  prov: any[];

  data: {

    table_cells: any[];

  };

}