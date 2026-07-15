import * as fs from "fs";

import {
    DoclingMapper,
} from "../modules/simulator/document/extraction/docling";

const raw = JSON.parse(
    fs.readFileSync("./docling-output.json", "utf8")
);

const document =
    new DoclingMapper().map(raw);

let found = 0;

for (const node of raw.texts) {

    const text =
        node.text ??
        node.orig ??
        node.marker ??
        "";

    if (!/^[ABCD]\)/.test(text.trim())) {
        continue;
    }

    console.log({
        label: node.label,
        page: node.prov?.[0]?.page_no,
        self: node.self_ref,
        text,
    });

}

console.log("\nTotal option blocks:", found);