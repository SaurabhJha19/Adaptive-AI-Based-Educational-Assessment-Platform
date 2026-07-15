import {

  ParsedDocument,
  BlockType,
  ContentLayer,
  createBaseBlock,
  createProvenance,

} from "../../core";

import {
  PageBuilder,
} from "../../core/page.builder";

import {
  DocumentBuilder,
} from "../../core/document.builder";

import {
  sortBlocks,
} from "../../core/block-sorter";

import {
  DoclingDocument,
  DoclingGroup,
  DoclingPicture,
  DoclingTable,
  DoclingText,
} from "./types";

import {
  DoclingRefIndex,
} from "./ref-index";

export class DoclingMapper {

  map(
    document: DoclingDocument
  ): ParsedDocument {

    const builder =
      new DocumentBuilder();

    const totalPages =
        this.detectTotalPages(
            document
        );

    const pageBuilder =
        new PageBuilder(
            totalPages
        );

    const parsed =
      builder.build({

        source: "docling",

        title:
          document.name,

        pageCount: 0,

      });

    const index =
      new DoclingRefIndex(
        document
      );

    const reachable =
    this.collectReachableRefs(
        document
    );

    for (
    const ref
    of document.body.children
) {

    const node =
        index.get(
            ref.$ref
        );

    if (!node) {
        continue;
    }

    this.processNode(
        node,
        pageBuilder
    );

}

// Recover orphan text nodes that are not linked
// into body.children but still have provenance.

for (const node of document.texts ?? []) {

    if (
        reachable.has(node.self_ref)
    ) {
        continue;
    }

    if (
        !node.prov ||
        node.prov.length === 0
    ) {
        continue;
    }

    const text =
        this.getNodeText(node);

    if (!text) {
        continue;
    }

    this.processText(
        node,
        pageBuilder
    );

}

    for (

      const ref

      of document.body.children

    ) {

      const node =
        index.get(
          ref.$ref
        );

      if (
        !node
      ) {

        continue;

      }

      this.processNode(

        node,

        pageBuilder

      );

    }

    parsed.pages =
      pageBuilder.build();

    parsed.metadata.pageCount =
      totalPages;

    parsed.pages.forEach(

      page =>

        page.blocks =
          sortBlocks(
            page.blocks
          )

    );

    return parsed;

  }

  private processNode(
    node: any,
    pages: PageBuilder
  ) {

    if (
      node.self_ref.startsWith(
        "#/texts/"
      )
    ) {

      this.processText(
        node,
        pages
      );

      return;

    }

    if (
      node.self_ref.startsWith(
        "#/pictures/"
      )
    ) {

      this.processPicture(
        node,
        pages
      );

      return;

    }

    if (
      node.self_ref.startsWith(
        "#/tables/"
      )
    ) {

      this.processTable(
        node,
        pages
      );

    }

  }

    private processText(
        node: DoclingText,
        pages: PageBuilder
    ) {

        const prov =
            node.prov.map(createProvenance);

        const text =
            this.getNodeText(node);

        if (!text) {
            return;
        }

        const block =
            createBaseBlock(

                this.mapLabel(node.label),

                ContentLayer.BODY,

                node.self_ref,

                prov[0].page,

                text,

                node.orig ?? text,

                prov

            );

        pages.addBlock(
            prov[0].page,
            block
        );

    }

  private processPicture(
    node: DoclingPicture,
    pages: PageBuilder
  ) {

    const prov =
      node.prov.map(
        createProvenance
      );

    const block =
      createBaseBlock(

        BlockType.FIGURE,

        ContentLayer.BODY,

        node.self_ref,

        prov[0].page,

        "",

        "",

        prov

      );

    pages.addBlock(

        prov[0].page,

        block

    );

  }

  private processTable(
    node: DoclingTable,
    pages: PageBuilder
  ) {

    const prov =
      node.prov.map(
        createProvenance
      );

    const block =
      createBaseBlock(

        BlockType.TABLE,

        ContentLayer.BODY,

        node.self_ref,

        prov[0].page,

        "",

        "",

        prov

      );

    pages.addBlock(

        prov[0].page,

        block

    );

  }

    private mapLabel(
        label: string
    ): BlockType {

        switch (label) {

            case "text":
            case "paragraph":
            case "caption":
            case "inline":
                return BlockType.TEXT;

            case "list_item":
                return BlockType.LIST_ITEM;

            case "formula":
                return BlockType.FORMULA;

            case "page_header":
                return BlockType.PAGE_HEADER;

            case "page_footer":
                return BlockType.PAGE_FOOTER;

            case "section_header":
                return BlockType.SECTION_HEADER;

            default:
                return BlockType.UNKNOWN;

        }

    }


    private detectTotalPages(
          document: DoclingDocument
      ): number {

          let maxPage = 0;

          const scan = (
              items: any[]
          ) => {

              for (const item of items) {

                  for (
                      const prov of item.prov ?? []
                  ) {

                      maxPage = Math.max(

                          maxPage,

                          prov.page_no

                      );

                  }

              }

          };

          scan(
              document.texts ?? []
          );

          scan(
              document.tables ?? []
          );

          scan(
              document.pictures ?? []
          );

          return maxPage;

      }

private getNodeText(
    node: DoclingText
): string {

    const candidates = [

        node.text,

        node.orig,

        node.marker,

    ];

    for (const value of candidates) {

        if (
            typeof value === "string" &&
            value.trim().length > 0
        ) {

            return value.trim();

        }

    }

    return "";

}

  private collectReachableRefs(
    document: DoclingDocument
): Set<string> {

    const visited = new Set<string>();

    const index =
        new DoclingRefIndex(document);

    const visit = (ref: string) => {

        if (visited.has(ref)) {
            return;
        }

        visited.add(ref);

        const node = index.get(ref);

        if (!node) {
            return;
        }

        if (node.children) {

            for (const child of node.children) {

                visit(child.$ref);

            }

        }

    };

    for (const child of document.body.children) {

        visit(child.$ref);

    }

    return visited;

}

}