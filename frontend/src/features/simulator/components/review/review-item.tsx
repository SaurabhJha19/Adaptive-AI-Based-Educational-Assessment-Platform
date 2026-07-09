import {
    SimulatorButton,
} from "../ui";

import {
    QuestionStatus,
} from "../../utils";

interface Props {

    number: number;

    status: QuestionStatus;

    onClick: () => void;

}

const variants = {

    current: "primary",

    answered: "success",

    marked: "danger",

    visited: "secondary",

    unanswered: "secondary",

} as const;

export default function ReviewItem({

    number,

    status,

    onClick,

}: Props) {

    return (

        <SimulatorButton

            variantType={
                variants[status]
            }

            onClick={onClick}

            className="h-12 w-12 p-0"

        >

            {number}

        </SimulatorButton>

    );

}