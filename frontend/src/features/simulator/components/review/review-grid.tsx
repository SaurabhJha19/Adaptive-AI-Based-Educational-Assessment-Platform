import ReviewItem from "./review-item";

import {
    getQuestionStatus,
} from "../../utils";

interface Props {

    questions: any[];

    answers: Record<string, string>;

    marked: string[];

    visited: Set<string>;

    current: number;

    onSelect: (
        index: number
    ) => void;

}

export default function ReviewGrid({

    questions,

    answers,

    marked,

    visited,

    current,

    onSelect,

}: Props) {

    return (

        <div className="grid grid-cols-7 gap-3">

            {questions.map(

                (

                    question,

                    index

                ) => {

                    const key =

                        question._id ??

                        question.questionNumber;

                    const status =
                        getQuestionStatus({

                            question,

                            currentQuestion: current,

                            answers,

                            marked,

                            visited,

                        });

                    return (

                        <ReviewItem

                            key={key}

                            number={
                                question.questionNumber
                            }

                            status={status}

                            onClick={() =>
                                onSelect(index)
                            }

                        />

                    );

                }

            )}

        </div>

    );

}