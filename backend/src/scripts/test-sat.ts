import * as fs from "fs";

import {

    DoclingMapper,

} from "../modules/simulator/document/extraction/docling";

import {

    SATBuilder,

} from "../modules/simulator/parser/sat";

import {

    buildUEMStatistics,

} from "../modules/simulator/parser/core/uem";

const raw = JSON.parse(

    fs.readFileSync(

        "./docling-output.json",

        "utf8"

    )

);

const document =

    new DoclingMapper().map(
        raw
    );

const exam =

    new SATBuilder().build(
        document
    );

console.log(

    JSON.stringify(

        exam,

        null,

        2

    )

);

console.table(

    buildUEMStatistics(
        exam
    )

);