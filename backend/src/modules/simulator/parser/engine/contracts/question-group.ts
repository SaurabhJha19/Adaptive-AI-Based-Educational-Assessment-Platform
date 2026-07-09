import { ParsedQuestion } from "./question";

export interface ParsedQuestionGroup {

  title: string;

  passage: string;

  content?: any[];

  questions: ParsedQuestion[];

}