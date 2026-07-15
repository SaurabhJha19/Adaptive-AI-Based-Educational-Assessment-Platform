import { AnyBlock } from "../../../document/core";
import { LayoutSorter } from "../../../document/utils";
import { ContentBlockFilter } from "./content-block-filter";

export interface PageColumn {

    index: 1 | 2;

    blocks: AnyBlock[];

}

export class ColumnDetector {

    detect(
        blocks: AnyBlock[]
    ): PageColumn[] {

        const ordered =
            new ContentBlockFilter().filter(
                LayoutSorter.sort(blocks)
            );

        if (ordered.length === 0) {

            return [];

        }

        let minLeft = Infinity;
        let maxRight = -Infinity;

        for (const block of ordered) {

            const prov = block.provenance[0];

            if (!prov) continue;

            minLeft = Math.min(
                minLeft,
                prov.bbox.left
            );

            maxRight = Math.max(
                maxRight,
                prov.bbox.right
            );

        }

        const split =
            (minLeft + maxRight) / 2;

        const left: AnyBlock[] = [];
        const right: AnyBlock[] = [];

        for (const block of ordered) {

            const prov = block.provenance[0];

            if (!prov) continue;

            const center =
                (prov.bbox.left +
                    prov.bbox.right) /
                2;

            if (center < split) {

                left.push(block);

            } else {

                right.push(block);

            }

        }

        if (
            left.length === 0 ||
            right.length === 0
        ) {

            return [

                {

                    index: 1,

                    blocks: ordered,

                },

            ];

        }

        return [

            {

                index: 1,

                blocks: left,

            },

            {

                index: 2,

                blocks: right,

            },

        ];

    }

}