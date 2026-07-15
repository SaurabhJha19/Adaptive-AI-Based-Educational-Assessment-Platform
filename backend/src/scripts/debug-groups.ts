import * as fs from "fs";

import {
    DoclingRefIndex,
} from "../modules/simulator/document/extraction/docling/ref-index";

const raw = JSON.parse(
    fs.readFileSync("./docling-output.json", "utf8")
);

const index =
    new DoclingRefIndex(raw);

let found = 0;

function visit(ref: string) {

    const node = index.get(ref);

    if (!node) {
        return;
    }

    // TEXT
    if (node.text) {

        if (
            /^[ABCD]\)/m.test(node.text) ||
            /^[ABCD]\./m.test(node.text)
        ) {

            found++;

            console.log(node.self_ref);
            console.log(node.text);
            console.log("----------------");
        }

        return;
    }

    // GROUP
    if (node.children) {

        for (const child of node.children) {
            visit(child.$ref);
        }

    }

}

for (const child of raw.body.children) {

    visit(child.$ref);

}

console.log("FOUND:", found);