import * as fs from "fs";

import {
    DoclingMapper,
} from "../modules/simulator/document/extraction/docling";

import {
    DocumentValidator,
} from "../modules/simulator/document/core/document.validator";

import {
    buildStatistics,
} from "../modules/simulator/document/core/document.statistics";

import {
    DocumentExporter,
} from "../modules/simulator/document/core/document.exporter";

const raw = JSON.parse(

    fs.readFileSync(

        "./docling-output.json",

        "utf8"

    )

);

const mapper =
    new DoclingMapper();

const document =
    mapper.map(raw);

new DocumentValidator().validate(
    document
);

const stats =
    buildStatistics(
        document
    );

console.table(
    stats
);

new DocumentExporter().export(

    document,

    "./udm-output.json"

);

console.log(
    "UDM exported successfully."
);