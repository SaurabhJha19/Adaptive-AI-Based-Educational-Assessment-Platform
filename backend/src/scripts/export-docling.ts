import fs from "fs";

import {
    DoclingService,
} from "../modules/simulator/document";

async function main() {

    const result =
        await DoclingService.parse(
            "sample.pdf"
        );

    fs.writeFileSync(

        "docling-output.json",

        JSON.stringify(
            result,
            null,
            2
        )

    );

    console.log(
        "Exported"
    );

}

main();