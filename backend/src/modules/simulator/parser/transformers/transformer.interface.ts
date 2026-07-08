import { ParsedDocument } from "../engine";
import { IOfficialExam } from "../../models/official-exam.model";

export interface ExamTransformer {

    transform(

        document: ParsedDocument,

        exam: IOfficialExam

    ): Promise<IOfficialExam>;

}