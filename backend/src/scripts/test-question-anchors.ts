import * as fs from "fs";

import {
    DoclingMapper,
} from "../modules/simulator/document/extraction/docling";

import {
    ColumnDetector,
    QuestionAnchorDetector,
} from "../modules/simulator/parser/core/regions";

const raw = JSON.parse(
    fs.readFileSync("./docling-output.json", "utf8")
);

const document = new DoclingMapper().map(raw);

const page =
    document.pages.find(p => p.pageNumber === 5)!;

const columns =
    new ColumnDetector().detect(page.blocks);

const detector =
    new QuestionAnchorDetector();

for (const column of columns) {

    console.log(`\nCOLUMN ${column.index}`);

    console.table(
        detector.detect(column.blocks).map(a => ({
            question: a.question,
            type: a.block.type,
            text: a.block.text,
        }))
    );

}