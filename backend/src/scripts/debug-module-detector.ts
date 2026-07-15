import * as fs from "fs";

import {
    DoclingConverter
} from "../modules/simulator/document/converter";

const raw = JSON.parse(
    fs.readFileSync(
        "./docling-output.json",
        "utf8"
    )
);

console.log(Object.keys(raw));

console.log(
    JSON.stringify(
        raw.body,
        null,
        2
    )
);

console.log("Texts:", raw.texts?.length);
console.log("Tables:", raw.tables?.length);
console.log("Pictures:", raw.pictures?.length);

const document =
    new DoclingConverter()
        .convert(raw);

console.log("Pages:", document.pages.length);

console.log(
    "Reading Order:",
    document.readingOrder.length
);

console.log(
    JSON.stringify(
        document.pages[0],
        null,
        2
    )
);

for (const node of document.readingOrder) {

    const text =
        (node.text ?? "")
            .replace(/\s+/g, " ")
            .trim();

    if (!text) {
        continue;
    }

    console.log(
        `[Page ${node.page}]`,
        `"${text}"`
    );

}