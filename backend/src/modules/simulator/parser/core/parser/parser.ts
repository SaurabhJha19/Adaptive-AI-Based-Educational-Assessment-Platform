import { UDMDocument } from "../../../document/universal";

import { ExamDefinition } from "../exam-definition";

export interface ExamParser {

    readonly examType: string;

    parse(
        document: UDMDocument
    ): Promise<ExamDefinition>;

}