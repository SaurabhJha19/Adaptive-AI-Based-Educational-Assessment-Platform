import { ParsedModule } from "../types";
import {
    ParsedQuestionBlock,
    splitQuestions,
} from "./split-questions";

export function extractQuestionBlocks(
    module: ParsedModule
): ParsedQuestionBlock[] {

    const text =
        module.pages
            .map(
                page =>
                    page.content
            )
            .join("\n\n");

    return splitQuestions(
        text
    );

}