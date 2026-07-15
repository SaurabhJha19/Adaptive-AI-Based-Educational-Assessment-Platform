import * as fs from "fs";
import * as path from "path";

import { DoclingConverter } from "../modules/simulator/document/converter";

import {
    SATParserPipeline
} from "../modules/simulator/parser/sat-v2/pipeline/sat-parser.pipeline";

async function main() {

    const raw =
        JSON.parse(

            fs.readFileSync(

                "./docling-output.json",

                "utf8"

            )

        );

    const document =
        new DoclingConverter()
            .convert(raw);

    console.log(
        "Reading Order:",
        document.readingOrder.length
    );

    console.log(
        "Pages:",
        document.pages.length
    );

    console.log(
        document.readingOrder[0]
    );

    const parser =
        new SATParserPipeline();

    const exam =
        await parser.parse(
            document
        );

    const outputDir =
        path.join(
            process.cwd(),
            "output"
        );

    if (
        !fs.existsSync(
            outputDir
        )
    ) {

        fs.mkdirSync(
            outputDir,
            {
                recursive: true
            }
        );

    }

    fs.writeFileSync(

        path.join(
            outputDir,
            "exam-definition.json"
        ),

        JSON.stringify(
            exam,
            null,
            2
        )

    );

    console.log(
        "Exam generated successfully."
    );

    console.log(
        `Sections: ${exam.sections.length}`
    );

    console.log(
        `Questions: ${
            exam.sections.reduce(
                (s, section) =>
                    s +
                    section.modules.reduce(
                        (m, module) =>
                            m +
                            module.questions.length,
                        0
                    ),
                0
            )
        }`
    );

}

main().catch(console.error);