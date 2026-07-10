"use client";

import QuestionPalette from "../exam-player/question-palette";
import { SimulatorButton } from "../ui";

interface Props {

    exam: any;

    section: any;

    questions: any[];

    currentQuestion: number;

    answers: Record<string, string>;

    marked: string[];

    visited: Set<string>;

    onJump: (index: number) => void;

    onBack: () => void;

    onContinue: () => void;

}

export default function ReviewScreen({

    questions,

    currentQuestion,

    answers,

    marked,

    visited,

    onJump,

    onBack,

    onContinue,

}: Props) {

    const answered =
        Object.keys(
            answers
        ).length;

    return (

        <div className="flex h-screen flex-col bg-background">

            <div className="border-b bg-white px-8 py-6">

                <h1 className="text-2xl font-bold">

                    Review Your Answers

                </h1>

                <p className="mt-2 text-gray-500">

                    Review your marked and unanswered questions before continuing.

                </p>

            </div>

            <div className="flex flex-1 overflow-hidden">

                <div className="flex-1 p-8">

                    <div className="grid grid-cols-4 gap-6">

                        <div className="rounded-xl border bg-white p-6">

                            <div className="text-sm text-gray-500">

                                Total Questions

                            </div>

                            <div className="mt-2 text-3xl font-bold">

                                {questions.length}

                            </div>

                        </div>

                        <div className="rounded-xl border bg-white p-6">

                            <div className="text-sm text-gray-500">

                                Answered

                            </div>

                            <div className="mt-2 text-3xl font-bold text-green-600">

                                {answered}

                            </div>

                        </div>

                        <div className="rounded-xl border bg-white p-6">

                            <div className="text-sm text-gray-500">

                                Marked

                            </div>

                            <div className="mt-2 text-3xl font-bold text-red-600">

                                {marked.length}

                            </div>

                        </div>

                        <div className="rounded-xl border bg-white p-6">

                            <div className="text-sm text-gray-500">

                                Remaining

                            </div>

                            <div className="mt-2 text-3xl font-bold text-orange-600">

                                {questions.length - answered}

                            </div>

                        </div>

                    </div>

                </div>

                <QuestionPalette

                    questions={questions}

                    currentQuestion={currentQuestion}

                    answers={answers}

                    marked={marked}

                    visited={visited}

                    onSelectQuestion={onJump}

                />

            </div>

            <div className="flex items-center justify-between border-t bg-white px-8 py-5">

                <SimulatorButton

                    variantType="secondary"

                    onClick={onBack}

                >

                    Back to Questions

                </SimulatorButton>

                <SimulatorButton

                    variantType="primary"

                    onClick={onContinue}

                >

                    Continue

                </SimulatorButton>

            </div>

        </div>

    );

}