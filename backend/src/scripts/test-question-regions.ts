import * as fs from "fs";

import {
    DoclingMapper,
} from "../modules/simulator/document/extraction/docling";

import {
    ColumnDetector,
    QuestionRegionDetector,
} from "../modules/simulator/parser/core/regions";

const raw = JSON.parse(
    fs.readFileSync("./docling-output.json", "utf8")
);

const document =
    new DoclingMapper().map(raw);

const page =
    document.pages.find(
        p => p.pageNumber === 5
    )!;

const detector =
    new QuestionRegionDetector();

const columns =
    new ColumnDetector().detect(page.blocks);

for (const column of columns) {

    console.log(`\nCOLUMN ${column.index}`);

    const regions =
        detector.detect(column);

    console.table(

        regions.map(r => ({

            blocks:
                r.blocks.length,

            first:
                r.blocks[0].text,

            last:
                r.blocks.length > 0
                    ? r.blocks[r.blocks.length - 1].text
                    : "",

        }))

    );

}