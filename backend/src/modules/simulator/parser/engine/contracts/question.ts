import { ContentBlock } from "./content-block";

export interface ParsedQuestion {

  questionNumber: number;

  content: ContentBlock[];

  options: string[];

  answer: string;

  explanation: string;

  metadata?: Record<string, any>;

}