import { SharedContentType } from "../constants/shared-content.enum";
import { ParsedQuestion } from "./parsed-question.interface";

export interface ParsedGroup {
  title: string;

  sharedContent?: {
    type: SharedContentType;
    title?: string;
    content: string;
  };

  questions: ParsedQuestion[];
}