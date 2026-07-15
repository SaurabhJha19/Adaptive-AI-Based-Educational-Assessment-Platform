import {
    UDMDocument
} from "../../../document/universal";

import {
    ExamDefinition
} from "../../core/exam-definition";

import {
    ExamParser
} from "../../core/parser";

import {
    LayoutExtractor
} from "../extractors/layout-extractor";

import {
    BlockClassifier
} from "../classifier";

import {
    ModuleDetector
} from "../detectors/module-detector";

import {
    QuestionDetector
} from "../detectors/question-detector";

import {
    QuestionAssembler
} from "../builders/question-assembler";

import {
    ModuleAssembler
} from "../builders/module-assembler";

import {
    ExamBuilder
} from "../builders/exam-builder";

import {
    SATValidator
} from "../validators/sat-validator";

export class SATParserPipeline
    implements ExamParser {

    readonly examType = "sat";

    private readonly layoutExtractor =
        new LayoutExtractor();

    private readonly classifier =
        new BlockClassifier();

    private readonly moduleDetector =
        new ModuleDetector();

    private readonly questionDetector =
        new QuestionDetector();

    private readonly questionAssembler =
        new QuestionAssembler();

    private readonly moduleAssembler =
        new ModuleAssembler();

    private readonly examBuilder =
        new ExamBuilder();

    private readonly validator =
        new SATValidator();

    async parse(
        document: UDMDocument
    ): Promise<ExamDefinition> {

        //
        // Stage 1
        // Layout
        //

        const layout =
            this.layoutExtractor.extract(
                document
            );

        //
        // Stage 2
        // Classification
        //

        this.classifier.classify(
            layout
        );

        //
        // Stage 3
        // Module Detection
        //

        const boundaries =
            this.moduleDetector.detect(
                document
            );

        //
        // Stage 4
        // Question Detection
        //

        const anchors =
            this.questionDetector.detect(
                layout
            );
    
        // temp
            console.log(
                "\nDetected Anchors:",
                anchors.length
            );

            console.log(
                anchors.slice(0, 15)
            );
        //temp


        //
        // Stage 5
        // Question Assembly
        //

        const questions =
            this.questionAssembler.assemble(
                layout,
                anchors
            );


        // temp
            console.log(
                "\nQuestions:",
                questions.length
            );
        // temp

        //
        // Stage 6
        // Module Assembly
        //

        const sections =
            this.moduleAssembler.assemble(
                boundaries,
                questions
            );

        //
        // Stage 7
        // Exam Builder
        //

        const exam =
            this.examBuilder.build({

                examType: "sat",

                title: "SAT Practice Test",

                sections

            });

        //
        // Stage 8
        // Validation
        //

        const errors =
            this.validator.validate(
                exam
            );

        if (errors.length) {

            throw new Error(

                "SAT validation failed\n\n" +

                errors.join("\n")

            );

        }

        return exam;

    }

}