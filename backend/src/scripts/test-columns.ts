import * as fs from "fs";

import {
    DoclingMapper,
} from "../modules/simulator/document/extraction/docling";

import {
    ColumnDetector,
} from "../modules/simulator/parser/core/regions";

const raw = JSON.parse(
    fs.readFileSync("./docling-output.json", "utf8")
);

const document =
    new DoclingMapper().map(raw);

const detector =
    new ColumnDetector();

const page =
    document.pages.find(
        p => p.pageNumber === 5
    )!;

const columns =
    detector.detect(page.blocks);

for (const column of columns) {

    console.log();

    console.log(
        `COLUMN ${column.index}`
    );

    console.table(

        column.blocks.map(b => ({

            type: b.type,

            text:
                b.text.slice(0, 40),

            left:
                b.provenance[0]?.bbox.left,

        }))

    );

}