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

    return (

        <div className="mx-auto max-w-3xl">

            <div className="mb-8">

                <ContentRenderer

                    blocks={

                        question.content

                    }

                />

            </div>

            <div className="space-y-4">

                {

                    question.options.map(

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

                                className={`flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-all

                                ${

                                    answer === option

                                        ? "border-blue-600 bg-blue-50"

                                        : "hover:border-blue-300 hover:bg-gray-50"

                                }`}

                            >

                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-semibold">

                                    {

                                        String.fromCharCode(

                                            65 +

                                            index

                                        )

                                    }

                                </div>

                                <div className="leading-7">

                                    {option}

                                </div>

                            </button>

                        )

                    )

                }

            </div>

        </div>

    );

}