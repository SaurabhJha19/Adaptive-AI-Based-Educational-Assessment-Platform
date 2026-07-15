import * as fs from "fs";

import {

    DoclingMapper,

} from "../modules/simulator/document/extraction/docling";

import {

    SATModuleBoundaryDetector,

} from "../modules/simulator/parser/sat/detectors/module-boundary.detector";

import {

    SATQuestionDetector,

} from "../modules/simulator/parser/sat/detectors/question.detector";

const raw = JSON.parse(

    fs.readFileSync(

        "./docling-output.json",

        "utf8"

    )

);

const document =

    new DoclingMapper().map(raw);

const modules =

    new SATModuleBoundaryDetector()

        .detect(document);

const detector =

    new SATQuestionDetector();

const questions =

    detector.detect(

        document,

        modules

    );

console.table(

    questions.map(q => ({

        module:

            `${q.module.section}-${q.module.module}`,

        question:

            q.number,

        page:

            q.page,

        blocks:

            q.blocks.length,

    }))

);

console.log(

    "\nTotal Questions:",

    questions.length

);