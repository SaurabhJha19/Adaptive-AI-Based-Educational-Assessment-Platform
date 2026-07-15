import { readFileSync, writeFileSync } from "fs";
import path from "path";

import { DoclingMapper } from "../modules/simulator/document/extraction/docling";
import { ColumnDetector } from "../modules/simulator/parser/core/regions/column-detector";
import { BlockType, AnyBlock } from "../modules/simulator/document/core";

const raw = JSON.parse(
    readFileSync(
        path.join(process.cwd(), "docling-output.json"),
        "utf8"
    )
);

const document =
    new DoclingMapper().map(raw);

const output: Record<string, any> = {};

for (const page of document.pages) {

    const columns =
        new ColumnDetector().detect(page.blocks);

    const pageData: Record<string, any> = {};

    for (const column of columns) {

        const blocks = column.blocks
            .filter((block: AnyBlock) =>

                block.type === BlockType.TEXT ||
                block.type === BlockType.SECTION_HEADER ||
                block.type === BlockType.FORMULA ||
                block.type === BlockType.TABLE ||
                block.type === BlockType.FIGURE

            )
            .map((block: AnyBlock) => {

                const prov =
                    block.provenance[0];

                const bbox =
                    prov.bbox;

                return {

                    text: block.text,

                    type: block.type,

                    left: bbox.left,

                    top: bbox.top,

                    right: bbox.right,

                    bottom: bbox.bottom,

                    width:
                        bbox.right -
                        bbox.left,

                    height:
                        bbox.bottom -
                        bbox.top,

                };

            });

        pageData[`column_${column.index}`] =
            blocks;

    }

    output[`page_${page.pageNumber}`] =
        pageData;

}

const outputPath =
    path.join(
        process.cwd(),
        "anchor-debug.json"
    );

writeFileSync(
    outputPath,
    JSON.stringify(
        output,
        null,
        2
    ),
    "utf8"
);

console.log();
console.log("=================================");
console.log("Export completed.");
console.log(outputPath);
console.log("=================================");