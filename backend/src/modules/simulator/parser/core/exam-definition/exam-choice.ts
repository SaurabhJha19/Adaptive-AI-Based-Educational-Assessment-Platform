export interface ExamChoice {

    id: string;

    label: "A" | "B" | "C" | "D" | "E";

    text: string;

    isCorrect?: boolean;

}