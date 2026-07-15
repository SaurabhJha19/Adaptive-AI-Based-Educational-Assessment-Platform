import * as fs from "fs";

import {
    DoclingConverter
} from "../../../document/converter";

import {
    LayoutExtractor
} from "../extractors/layout-extractor";

import {
    BlockClassifier
} from "../classifier";

async function main() {

    const raw =
        JSON.parse(
            fs.readFileSync(
                "../../../../../../docling-output.json",
                "utf8"
            )
        );

    const document =
        new DoclingConverter()
            .convert(raw);

    const layout =
        new LayoutExtractor()
            .extract(document);

    new BlockClassifier()
        .classify(layout);

    fs.writeFileSync(

        "./layout.json",

        JSON.stringify(
            layout,
            null,
            2
        )

    );

    console.log(
        "layout.json written."
    );

}

main();