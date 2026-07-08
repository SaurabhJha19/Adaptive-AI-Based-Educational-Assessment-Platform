import { ValidationError }
from "./validation-error";

export function
validateQuestion(
    question: any
) {

    if (
        !question.prompt?.trim()
    ) {

        throw new ValidationError(

            "Question prompt is empty.",

            "question.prompt"

        );

    }

    if (

        !question.options ||

        question.options.length < 2

    ) {

        throw new ValidationError(

            "Question has insufficient options.",

            `question.${question.questionNumber}`

        );

    }

    if (

        question.correctAnswer ===

        undefined ||

        question.correctAnswer ===

        null ||

        question.correctAnswer === ""

    ) {

        throw new ValidationError(

            "Question has no answer.",

            `question.${question.questionNumber}`

        );

    }

}