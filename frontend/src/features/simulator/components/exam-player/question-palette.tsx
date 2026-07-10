import { SimulatorButton } from "../ui";
import {
    getQuestionStatus,
} from "../../utils";

interface Props {

    questions: any[];

    currentQuestion: number;

    answers: Record<string, string>;

    visited: Set<string>;

    marked: string[];

    onSelectQuestion: (
        index: number
    ) => void;

}

export default function QuestionPalette({

    questions,

    currentQuestion,

    answers,

    marked,

    visited,

    onSelectQuestion,

}: Props) {

    const answered =
        Object.keys(
            answers
        ).length;

    return (

        <div className="flex h-full w-72 flex-col bg-gray-50">

            <div className="border-b bg-white p-5">

                <h3 className="text-base font-semibold">

                    Question Palette

                </h3>

                <p className="mt-1 text-sm text-gray-500">

                    {answered} / {questions.length} answered

                </p>

            </div>

            <div className="flex-1 overflow-y-auto p-5">

                <div className="grid grid-cols-5 gap-3">

                    {

                        questions.map(

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

                                        currentQuestion,

                                        answers,

                                        marked,

                                        visited,

                                    });

                                const variants = {

                                    current:

                                        "primary",

                                    answered:

                                        "success",

                                    marked:

                                        "danger",

                                    visited:

                                        "secondary",

                                    unanswered:

                                        "secondary",

                                } as const;

                                return (

                                    <SimulatorButton

                                        key={key}

                                        variantType={

                                            variants[status]

                                        }

                                        onClick={() =>

                                            onSelectQuestion(

                                                index

                                            )

                                        }

                                        className="h-11 w-11 rounded-lg p-0"

                                    >

                                        {

                                            question.questionNumber

                                        }

                                    </SimulatorButton>

                                );

                            }

                        )

                    }

                </div>

            </div>

            <div className="border-t bg-white p-5">

                <div className="space-y-2 text-sm">

                    <div className="flex items-center gap-2">

                        <div className="h-3 w-3 rounded-full bg-blue-600" />

                        Current

                    </div>

                    <div className="flex items-center gap-2">

                        <div className="h-3 w-3 rounded-full bg-green-600" />

                        Answered

                    </div>

                    <div className="flex items-center gap-2">

                        <div className="h-3 w-3 rounded-full bg-red-600" />

                        Marked

                    </div>

                    <div className="flex items-center gap-2">

                        <div className="h-3 w-3 rounded-full bg-gray-400" />

                        Visited

                    </div>

                </div>

            </div>

        </div>

    );

}