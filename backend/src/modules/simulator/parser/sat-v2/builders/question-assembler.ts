import { randomUUID } from "crypto";

import {
    ExamQuestion
} from "../../core/exam-definition";

import {
    LayoutBlock,
    LayoutDocument
} from "../layout";

import {
    QuestionAnchor
} from "../detectors/question-detector";

import {
    ChoiceDetector
} from "../detectors/choice-detector";

import {
    ChoiceBuilder
} from "./choice-builder";

import {
    PassageDetector
} from "../detectors/passage-detector";

export class QuestionAssembler {

    assemble(
        layout: LayoutDocument,
        anchors: QuestionAnchor[]
    ): ExamQuestion[] {

        const blocks =
            this.flatten(layout);

        const questions: ExamQuestion[] = [];

        const passageDetector =
            new PassageDetector();

        const passageRegions =
            passageDetector.detect(layout);

        const passageMap =
            new Map(
                passageRegions.map(region => [
                    region.question,
                    region
                ])
            );

        const choiceDetector =
            new ChoiceDetector();

        const choiceBuilder =
            new ChoiceBuilder();

        const choiceRegions =
            choiceDetector.detect(layout);

        const choiceMap =
            new Map(
                choiceRegions.map(region => [
                    region.question,
                    choiceBuilder.build(region)
                ])
            );

        for (
            let i = 0;
            i < anchors.length;
            i++
        ) {

            const anchor =
                anchors[i];

            const next =
                i + 1 < anchors.length
                    ? anchors[i + 1]
                    : undefined;

            const region =
                this.getBlocksBetweenAnchors(
                    blocks,
                    anchor,
                    next
                );

            const passage =
                passageMap.get(
                    anchor.number
                );

            const question: ExamQuestion = {

                id: randomUUID(),

                number:
                    anchor.number,

                page:
                    anchor.page,

                prompt:
                    passage?.prompt.trim() ??
                    "",

                passage:
                    passage?.passage.trim() ??
                    "",

                instruction:
                    passage?.instruction.trim() ??
                    "",

                choices:
                    choiceMap.get(
                        anchor.number
                    ) ?? [],

                assets: []

            };

            for (const block of region) {

                switch (block.type) {

                    case "formula":

                        question.prompt +=
                            "\n" +
                            block.text;

                        break;

                    case "image":

                    case "graph":

                    case "table":

                        question.assets.push({

                            id: randomUUID(),

                            type:
                                block.type,

                            page:
                                block.page,

                            bbox:
                                block.bbox

                        });

                        break;

                }

            }

            questions.push(
                question
            );

        }

        return questions;

    }

    private getBlocksBetweenAnchors(
        blocks: LayoutBlock[],
        current: QuestionAnchor,
        next?: QuestionAnchor
    ): LayoutBlock[] {

        const start =
            blocks.findIndex(
                block =>
                    block.page ===
                        current.page &&
                    block.column ===
                        current.column &&
                    block.type ===
                        "question_number" &&
                    Number(
                        block.text
                    ) ===
                        current.number
            );

        if (start === -1) {

            return [];

        }

        let end =
            blocks.length;

        if (next) {

            const nextIndex =
                blocks.findIndex(
                    block =>
                        block.page ===
                            next.page &&
                        block.column ===
                            next.column &&
                        block.type ===
                            "question_number" &&
                        Number(
                            block.text
                        ) ===
                            next.number
                );

            if (
                nextIndex !== -1
            ) {

                end =
                    nextIndex;

            }

        }

        return blocks.slice(
            start + 1,
            end
        );

    }

    private flatten(
        layout: LayoutDocument
    ): LayoutBlock[] {

        const blocks: LayoutBlock[] = [];

        for (const page of layout.pages) {

            for (const column of page.columns) {

                blocks.push(
                    ...column.blocks
                );

            }

        }

        blocks.sort(
            (a, b) => {

                if (
                    a.page !==
                    b.page
                ) {

                    return (
                        a.page -
                        b.page
                    );

                }

                if (
                    a.column !==
                    b.column
                ) {

                    return (
                        a.column -
                        b.column
                    );

                }

                return (
                    a.bbox.top -
                    b.bbox.top
                );

            }
        );

        return blocks;

    }

}