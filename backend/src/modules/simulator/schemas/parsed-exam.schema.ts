import { z } from "zod";

export const ParsedQuestionSchema = z.object({
  type: z.string(),
  prompt: z.string(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string(),
  explanation: z.string().optional(),
});

export const ParsedGroupSchema = z.object({
  instructions: z.string().optional(),
  questions: z.array(ParsedQuestionSchema),
});

export const ParsedSectionSchema = z.object({
  type: z.enum([
    "reading",
    "listening",
    "speaking",
    "writing",
  ]),
  title: z.string().optional(),
  sharedContent: z.string(),
  groups: z.array(ParsedGroupSchema),
});

export const ParsedExamSchema = z.object({
  title: z.string(),
  examCode: z.string(),
  examType: z.string(),
  sections: z.array(ParsedSectionSchema),
});