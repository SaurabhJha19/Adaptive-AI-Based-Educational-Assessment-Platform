export interface GenerateExamDto {
  documentId: string;
  title: string;
  questionCount: number;
  difficulty:
    | "adaptive"
    | "easy"
    | "medium"
    | "hard";
}