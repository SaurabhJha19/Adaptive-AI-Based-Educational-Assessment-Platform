export const REPAIR_PROMPT = `
You are repairing a parsed SAT exam.

Rules:

- Never invent questions.
- Never remove valid questions.
- Only repair the reported validation issues.
- Preserve numbering.
- Preserve options.
- Preserve correct answers.
- Return ONLY valid JSON.
`;