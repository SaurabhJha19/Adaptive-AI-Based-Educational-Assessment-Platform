import {
    UDMDocument
} from "../../../document/universal";

export interface ModuleBoundary {

    section:
        | "reading_writing"
        | "math";

    module: 1 | 2;

    pageStart: number;

    pageEnd: number;

}

export class ModuleDetector {

    detect(
        document: UDMDocument
    ): ModuleBoundary[] {

        const rwPages: number[] = [];
        const mathPages: number[] = [];
        const stopPages: number[] = [];

        for (const node of document.readingOrder) {

            const text =
                (node.text ?? "")
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase();

            if (!text) {
                continue;
            }

            if (
                text.includes("reading") &&
                text.includes("writing")
            ) {

                if (
                    !rwPages.includes(
                        node.page
                    )
                ) {

                    rwPages.push(
                        node.page
                    );

                }

                continue;

            }

            if (
                text === "math"
            ) {

                if (
                    !mathPages.includes(
                        node.page
                    )
                ) {

                    mathPages.push(
                        node.page
                    );

                }

                continue;

            }

            if (
                text === "stop"
            ) {

                if (
                    !stopPages.includes(
                        node.page
                    )
                ) {

                    stopPages.push(
                        node.page
                    );

                }

            }

        }

        if (
            rwPages.length !== 2 ||
            mathPages.length !== 2 ||
            stopPages.length < 4
        ) {

            throw new Error(
                "Unable to determine SAT module boundaries."
            );

        }

        const mathStart =
            this.findMathStart(
                document,
                mathPages[0],
                stopPages[2]
            );

        return [

            {

                section:
                    "reading_writing",

                module: 1,

                pageStart:
                    rwPages[0],

                pageEnd:
                    stopPages[0]

            },

            {

                section:
                    "reading_writing",

                module: 2,

                pageStart:
                    rwPages[1],

                pageEnd:
                    stopPages[1]

            },

            {

                section:
                    "math",

                module: 1,

                pageStart:
                    mathStart,

                pageEnd:
                    stopPages[2]

            },

            {

                section:
                    "math",

                module: 2,

                pageStart:
                    mathPages[1],

                pageEnd:
                    stopPages[3]

            }

        ];

    }

    private findMathStart(

        document: UDMDocument,

        from: number,

        to: number

    ): number {

        for (
            let page = from;
            page <= to;
            page++
        ) {

            const hasQuestion =
                document.readingOrder.some(

                    node =>

                        node.page === page &&

                        /^(?:[1-9]|1\d|2[0-7])$/.test(
                            (node.text ?? "").trim()
                        )

                );

            if (
                hasQuestion
            ) {

                return page;

            }

        }

        return from;

    }

}