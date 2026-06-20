export const buildQuestionPrompt =
  (
    context: string,
    difficulty:
      | "easy"
      | "medium"
      | "hard",
    count: number
  ) => {

    return `
You are an educational assessment generator.

Generate ${count}
multiple choice questions.

Difficulty:
${difficulty}

Requirements:

- 4 options per question
- 1 correct answer
- Return JSON only

Context:

${context}
`;
  };