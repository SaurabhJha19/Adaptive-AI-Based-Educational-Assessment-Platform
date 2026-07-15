import { ExamDefinition } from "../exam-definition";

export interface ParserResult {

    exam: ExamDefinition;

    warnings: string[];

    errors: string[];

}