export type QuestionStatus =
    | "current"
    | "answered"
    | "marked"
    | "visited"
    | "unanswered";

interface Params {

    question: any;

    currentQuestion: number;

    answers: Record<string, string>;

    marked: string[];

    visited: Set<string>;

}

export function getQuestionStatus({

    question,

    currentQuestion,

    answers,

    marked,

    visited,

}: Params): QuestionStatus {

    const key =
        question._id ??
        question.questionNumber;

    if (

        question.questionNumber ===

        currentQuestion

    ) {

        return "current";

    }

    if (

        marked.includes(key)

    ) {

        return "marked";

    }

    if (

        answers[key]

    ) {

        return "answered";

    }

    if (

        visited.has(key)

    ) {

        return "visited";

    }

    return "unanswered";

}