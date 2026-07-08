import {
    validateGroup,
} from "./validate-group";

export function
validateSection(
    section: any
) {

    for (

        const group

        of section.questionGroups

    ) {

        validateGroup(
            group
        );

    }

}