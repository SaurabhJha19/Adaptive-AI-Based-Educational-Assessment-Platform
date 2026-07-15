import * as fs from "fs";

import {

    DoclingMapper,

} from "../modules/simulator/document/extraction/docling";

import {

    ExamGraphBuilder,

} from "../modules/simulator/parser/core/exam-graph";

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

const graph =

    new ExamGraphBuilder().build(

        document

    );

console.log(

    "Pages:",

    graph.root.children.length

);

console.log(

    "Root:",

    graph.root.type

);

for (

    const page of graph.root.children

) {

    console.log(

        `Page ${page.pageStart} -> ${page.blocks.length} blocks`

    );

}