import {
    validateQuestion,
} from "./validate-question";

export function
validateGroup(
    group: any
) {

    for (

        const question

        of group.questions

    ) {

        validateQuestion(
            question
        );

    }

}