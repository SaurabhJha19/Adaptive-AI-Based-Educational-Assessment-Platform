export interface QuestionContext {

    system: string;

    user: string;

}

export function buildQuestionContext(
    question: string
): QuestionContext {

    return {

        system: `
You are an SAT parser.

Extract exactly ONE SAT question.

Return ONLY JSON.

Schema:

{
  "questionNumber":0,
  "prompt":"",
  "options":[],
  "correctAnswer":"",
  "explanation":""
}
`.trim(),

        user: question,

    };

}