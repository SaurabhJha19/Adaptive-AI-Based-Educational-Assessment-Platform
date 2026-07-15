import { ExamAsset } from "./exam-asset";
import { ExamChoice } from "./exam-choice";

export interface ExamQuestion {

    id: string;

    number: number;

    page: number;

    prompt: string;

    passage?: string;

    instruction?: string;

    choices: ExamChoice[];

    correctAnswer?: "A" | "B" | "C" | "D" | "E";

    explanation?: string;

    assets: ExamAsset[];

    metadata?: Record<string, any>;

}