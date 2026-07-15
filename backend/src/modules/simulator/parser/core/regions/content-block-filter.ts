import {
    AnyBlock,
    BlockType,
} from "../../../document/core";

export class ContentBlockFilter {

    filter(
        blocks: AnyBlock[]
    ): AnyBlock[] {

        return blocks.filter(block => {

            switch (block.type) {

                case BlockType.PAGE_HEADER:
                case BlockType.PAGE_FOOTER:
                    return false;

                default:
                    break;

            }

            const text =
                block.text.trim();

            // Ignore decorative separators
            if (/^[.\-_ ]{20,}$/.test(text)) {
                return false;
            }

            return true;

        });

    }

}