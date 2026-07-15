import {
    AnyBlock,
    BlockType,
} from "../../../document/core";

export interface QuestionAnchor {

    question: number;

    block: AnyBlock;

}

export class QuestionAnchorDetector {

    detect(
        blocks: AnyBlock[]
    ): QuestionAnchor[] {

        const anchors: QuestionAnchor[] = [];

        for (const block of blocks) {

            const prov = block.provenance[0];

            if (!prov) continue;

            const text = block.text.trim();

            // Must be a pure integer
            if (!/^\d+$/.test(text)) {
                continue;
            }

            const number = Number(text);

            if (number < 1 || number > 33) {
                continue;
            }

            const width =
                prov.bbox.right -
                prov.bbox.left;

            const height =
                prov.bbox.bottom -
                prov.bbox.top;

            // SAT question numbers are tiny
            if (width > 15) continue;
            if (height > 20) continue;

            // Ignore headers/footers
            if (
                block.type === BlockType.PAGE_HEADER ||
                block.type === BlockType.PAGE_FOOTER
            ) {
                continue;
            }

            anchors.push({
                question: number,
                block,
            });

        }

        return anchors;

    }

}