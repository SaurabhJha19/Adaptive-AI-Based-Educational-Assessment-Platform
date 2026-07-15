import * as fs from "fs";

import {
    DoclingMapper,
} from "../modules/simulator/document/extraction/docling";

import {
    SATModuleBoundaryDetector,
} from "../modules/simulator/parser/sat/detectors/module-boundary.detector";

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

const detector =
    new SATModuleBoundaryDetector();

const modules =
    detector.detect(
        document
    );

console.table(modules);