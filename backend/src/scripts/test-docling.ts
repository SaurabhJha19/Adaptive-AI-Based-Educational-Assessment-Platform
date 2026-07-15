import { checkDoclingHealth, DoclingService } from "../modules/simulator/document";

async function main() {

    console.log("Checking Docling...");

    const health =
        await checkDoclingHealth();

    console.log(health);

    console.log("Sending PDF...");

    const result =
        await DoclingService.parse(
            "sample.pdf"
        );

    console.log("Done");

    console.log(
        JSON.stringify(
            result,
            null,
            2
        )
    );
}

main().catch(console.error);