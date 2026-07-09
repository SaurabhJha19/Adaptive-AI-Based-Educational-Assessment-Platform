import { ContentRenderer } from "../../renderers";

interface Props {

    question: any;

    answer?: string;

    onAnswer: (
        value: string
    ) => void;

}

export default function QuestionView({

    question,

    answer,

    onAnswer,

}: Props) {

    const hasRichContent =

        Array.isArray(
            question.content
        ) &&

        question.content.length > 0;

    return (

        <div className="mx-auto max-w-4xl">

            <div className="mb-6 text-xl font-semibold">

                Question {question.questionNumber}

            </div>

            <div className="mb-8">

                {

                    hasRichContent

                    ?

                    <ContentRenderer

                        blocks={
                            question.content
                        }

                    />

                    :

                    <div className="whitespace-pre-wrap text-lg">

                        {question.prompt}

                    </div>

                }

            </div>

            <div className="space-y-4">

                {question.options.map(

                    (

                        option: string,

                        index: number

                    ) => (

                        <button

                            key={index}

                            onClick={() =>

                                onAnswer(
                                    option
                                )

                            }

                            className={

                                `block w-full rounded-lg border p-4 text-left transition

                                ${

                                    answer === option

                                        ?

                                        "border-black bg-gray-100"

                                        :

                                        "hover:bg-gray-50"

                                }`

                            }

                        >

                            {option}

                        </button>

                    )

                )}

            </div>

        </div>

    );

}