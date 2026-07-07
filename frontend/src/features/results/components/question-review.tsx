import {

    Card,

    CardContent,

    CardHeader,

    CardTitle,

} from "@/components/ui/card";

import { QuestionReview } from "../types";

type Props = {

    questions: QuestionReview[];

};

export default function QuestionReviewList({

    questions,

}: Props) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Question Review

                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

                {

                    questions.map(

                        (

                            question,

                            index

                        ) => (

                            <div

                                key={question.questionId}

                                className="rounded-lg border p-5"

                            >

                                <h3 className="font-semibold">

                                    Question {index + 1}

                                </h3>

                                <p className="mt-2">

                                    {question.question}

                                </p>

                                <div className="mt-4 space-y-1 text-sm">

                                    <p>

                                        <strong>

                                            Your Answer:

                                        </strong>

                                        {" "}

                                        {question.selectedAnswer}

                                    </p>

                                    <p>

                                        <strong>

                                            Correct Answer:

                                        </strong>

                                        {" "}

                                        {question.correctAnswer}

                                    </p>

                                    <p>

                                        <strong>

                                            Explanation:

                                        </strong>

                                        {" "}

                                        {question.explanation}

                                    </p>

                                </div>

                            </div>

                        )

                    )

                }

            </CardContent>

        </Card>

    );

}