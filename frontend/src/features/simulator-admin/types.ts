export type OfficialExamStatus =
    | "UPLOADED"
    | "PARSING"
    | "REVIEW"
    | "VALIDATED"
    | "PUBLISHED"
    | "ARCHIVED"
    | "FAILED";

export interface OfficialExam {

    _id: string;

    examCode: string;

    title: string;

    examType: string;

    status: OfficialExamStatus;

    totalQuestions: number;

    duration: number;

    pdfUrl: string;

    answerPdfUrl?: string;

    createdAt: string;

    updatedAt: string;

}

export interface CreateOfficialExamPayload {

    examCode: string;

    title: string;

    examType: string;

    duration?: number;

    questionPdf: File;

    answerPdf?: File;

}