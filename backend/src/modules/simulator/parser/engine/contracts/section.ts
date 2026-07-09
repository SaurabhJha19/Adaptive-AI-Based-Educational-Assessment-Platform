import { ParsedQuestionGroup } from "./question-group";

export interface ParsedSection {

  title: string;

  order: number;

  questionGroups: ParsedQuestionGroup[];

}