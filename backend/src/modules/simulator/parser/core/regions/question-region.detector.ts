import { randomUUID } from "crypto";

import { PageColumn } from "./column-detector";
import { QuestionAnchorDetector } from "./question-anchor-detector";
import { QuestionRegion } from "./question-region.types";

export class QuestionRegionDetector {

    detect(
        column: PageColumn
    ): QuestionRegion[] {

        const anchors =
            new QuestionAnchorDetector()
                .detect(column.blocks);

        const regions: QuestionRegion[] = [];

        if (anchors.length === 0) {
            return regions;
        }

        for (let i = 0; i < anchors.length; i++) {

            const start =
                column.blocks.indexOf(
                    anchors[i].block
                );

            const end =
                i + 1 < anchors.length
                    ? column.blocks.indexOf(
                          anchors[i + 1].block
                      )
                    : column.blocks.length;

            const blocks =
                column.blocks.slice(start, end);

            const first =
                blocks[0].provenance[0];

            const last =
                blocks[blocks.length - 1].provenance[0];

            regions.push({

                id: randomUUID(),

                page: first?.page ?? 0,

                column: column.index,

                top: first?.bbox.top ?? 0,

                bottom: last?.bbox.bottom ?? 0,

                left: first?.bbox.left ?? 0,

                right: last?.bbox.right ?? 0,

                blocks,

            });

        }

        return regions;

    }

}