import { ParsedGroup } from "./parsed-group.interface";

export interface ParsedSection {
  title: string;
  duration: number;
  instructions?: string;
  groups: ParsedGroup[];
}