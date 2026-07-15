import { ExamDefinition } from "../../core/exam-definition";
import { ModuleBoundary } from "../detectors/module-detector";
import { ExamQuestion } from "../../core/exam-definition";

import { ModuleAssembler } from "./module-assembler";
import { ExamBuilder } from "./exam-builder";

export class SATBuilder {

    private readonly moduleAssembler =
        new ModuleAssembler();

    private readonly examBuilder =
        new ExamBuilder();

    build(

        boundaries: ModuleBoundary[],

        questions: ExamQuestion[]

    ): ExamDefinition {

        const sections =
            this.moduleAssembler.assemble(

                boundaries,

                questions

            );

        return this.examBuilder.build(

            sections

        );

    }

}