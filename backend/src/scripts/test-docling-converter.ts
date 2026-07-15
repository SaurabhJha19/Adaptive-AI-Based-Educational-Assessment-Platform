import fs from "fs";

import { DoclingConverter } from "../modules/simulator/document/converter";

async function main() {

    const raw = JSON.parse(

        fs.readFileSync(
            "./docling-output.json",
            "utf8"
        )

    );

    const converter =
        new DoclingConverter();

    const udm =
        converter.convert(raw);

    console.log(
        JSON.stringify(
            udm,
            null,
            2
        )
    );

}

main();