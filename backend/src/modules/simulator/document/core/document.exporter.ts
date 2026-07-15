import fs from "fs";

import { ParsedDocument } from "./document.interfaces";

export class DocumentExporter {

    export(

        document: ParsedDocument,

        path: string

    ) {

        fs.writeFileSync(

            path,

            JSON.stringify(

                document,

                null,

                2

            )

        );

    }

}