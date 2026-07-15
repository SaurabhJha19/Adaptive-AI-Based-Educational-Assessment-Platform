import {
  DoclingDocument,
} from "./types";

export class DoclingRefIndex {

  private readonly refs =
    new Map<string, any>();

  constructor(
    document: DoclingDocument
  ) {

    [

      ...(document.texts ?? []),

      ...(document.groups ?? []),

      ...(document.tables ?? []),

      ...(document.pictures ?? [])

    ].forEach(

      item =>

        this.refs.set(

          item.self_ref,

          item

        )

    );

  }

  get(
    ref: string
  ) {

    return this.refs.get(
      ref
    );

  }

}