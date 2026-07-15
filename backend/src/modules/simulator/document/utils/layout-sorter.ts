import { AnyBlock, CoordinateOrigin } from "../core";
import { PageLayoutAnalyzer } from "./page-layout-analyzer";

export class LayoutSorter {

    static sort(
        blocks: AnyBlock[]
    ): AnyBlock[] {

        const layout =
            PageLayoutAnalyzer.analyze(
                blocks
            );

        if (

            layout.columns === 1

        ) {

            return [...blocks].sort(

                this.compare

            );

        }

        const left = blocks.filter(block => {

            const prov =
                block.provenance[0];

            if (!prov) {

                return true;

            }

            return (

                prov.bbox.left <

                layout.dividerX

            );

        });

        const right = blocks.filter(block => {

            const prov =
                block.provenance[0];

            if (!prov) {

                return false;

            }

            return (

                prov.bbox.left >=

                layout.dividerX

            );

        });

        left.sort(
            this.compare
        );

        right.sort(
            this.compare
        );

        return [

            ...left,

            ...right,

        ];

    }

    private static compare(

        a: AnyBlock,

        b: AnyBlock

    ) {

        const pa =
            a.provenance[0];

        const pb =
            b.provenance[0];

        if (!pa || !pb) {

            return 0;

        }

        const ay =
            pa.bbox.origin === CoordinateOrigin.BOTTOMLEFT
                ? -pa.bbox.top
                : pa.bbox.top;

        const by =
            pb.bbox.origin === CoordinateOrigin.BOTTOMLEFT
                ? -pb.bbox.top
                : pb.bbox.top;

        const dy = ay - by;

        if (

            Math.abs(dy) > 5

        ) {

            return dy;

        }

        return (

            pa.bbox.left -

            pb.bbox.left

        );

    }

}