import * as fs from "fs";

import {
    DoclingMapper,
} from "../modules/simulator/document/extraction/docling";

import {
    LayoutSorter,
} from "../modules/simulator/document/utils";

const raw = JSON.parse(
    fs.readFileSync("./docling-output.json", "utf8")
);

const document = new DoclingMapper().map(raw);

for (const page of document.pages) {

    if (
        page.pageNumber < 4 ||
        page.pageNumber > 6
    ) {
        continue;
    }

    console.log(
        "\n=================================================="
    );

    console.log(
        `PAGE ${page.pageNumber}`
    );

    console.log(
        "=================================================="
    );

    const ordered = LayoutSorter.sort(
        page.blocks
    );

    for (const block of ordered) {

        const prov = block.provenance[0];

        if (!prov) {
            continue;
        }

        console.log({

            text: block.text,

            type: block.type,

            left: Math.round(prov.bbox.left),

            top: Math.round(prov.bbox.top),

            right: Math.round(prov.bbox.right),

            bottom: Math.round(prov.bbox.bottom),

            width:
                Math.round(
                    prov.bbox.right -
                    prov.bbox.left
                ),

            height:
                Math.round(
                    prov.bbox.bottom -
                    prov.bbox.top
                )

        });

    }

}