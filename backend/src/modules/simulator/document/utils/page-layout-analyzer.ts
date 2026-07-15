import { AnyBlock } from "../core";

export interface PageLayout {

    columns: 1 | 2;

    dividerX: number;

}

export class PageLayoutAnalyzer {

    static analyze(
        blocks: AnyBlock[]
    ): PageLayout {

        const xs = blocks
            .flatMap(block =>
                block.provenance.map(p => p.bbox.left)
            );

        if (xs.length === 0) {

            return {

                columns: 1,

                dividerX: 0,

            };

        }

        xs.sort((a, b) => a - b);

        let largestGap = 0;

        let divider = 0;

        for (let i = 1; i < xs.length; i++) {

            const gap = xs[i] - xs[i - 1];

            if (gap > largestGap) {

                largestGap = gap;

                divider = (xs[i] + xs[i - 1]) / 2;

            }

        }

        if (largestGap > 120) {

            return {

                columns: 2,

                dividerX: divider,

            };

        }

        return {

            columns: 1,

            dividerX: divider,

        };

    }

}