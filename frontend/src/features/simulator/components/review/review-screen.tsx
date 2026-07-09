"use client";

import {

    ReviewHeader,

    ReviewSummary,

    ReviewGrid,

    ReviewLegend,

    SubmitPanel,

} from ".";

import {

    SimulatorPanel,

} from "../ui";

interface Props {

    exam: any;

    section: any;

    questions: any[];

    currentQuestion: number;

    answers: Record<string, string>;

    visited: Set<string>;

    marked: string[];

    onJump: (index: number) => void;

    onBack: () => void;

    onSubmit: () => void;

}

export default function ReviewScreen({

    exam,

    section,

    questions,

    currentQuestion,

    answers,

    marked,

    onJump,

    onBack,

    onSubmit,
    visited

}: Props) {

    const answered =

        questions.filter(

            question => {

                const key =

                    question._id ??

                    question.questionNumber;

                return !!answers[key];

            }

        ).length;

    const unanswered =

        questions.length -

        answered;

    return (

        <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 p-8">

            <ReviewHeader

                title={exam.title}

                section={section.title}

            />

            <ReviewSummary

                answered={answered}

                review={marked.length}

                unanswered={unanswered}

            />

            <SimulatorPanel className="p-8">

                <ReviewGrid

                    questions={questions}

                    answers={answers}

                    marked={marked}

                    visited={visited}

                    current={currentQuestion}

                    onSelect={onJump}

                />

            </SimulatorPanel>

            <ReviewLegend />

            <SubmitPanel

                onBack={onBack}

                onSubmit={onSubmit}

            />

        </div>

    );

}