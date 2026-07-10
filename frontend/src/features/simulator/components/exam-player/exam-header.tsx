import {
    SimulatorHeading,
    SimulatorText,
} from "../ui";

interface Props {

    exam: any;

    section: any;

    question: any;

    currentQuestion: number;

    totalQuestions: number;

    remainingTime: number;

}

export default function ExamHeader({

    exam,

    section,

    currentQuestion,

    totalQuestions,

    remainingTime,

}: Props) {

    const minutes =
        Math.floor(
            remainingTime / 60
        );

    const seconds =
        remainingTime % 60;

    const formattedTime =
        `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;

    return (

        <header className="flex h-16 items-center justify-between border-b bg-white px-8">

            <div className="flex items-center gap-4">

                <div className="flex flex-col">

                    <div className="text-xs uppercase tracking-[0.25em] text-blue-600">

                        Digital SAT

                    </div>

                    <SimulatorHeading>

                        {exam.title}

                    </SimulatorHeading>

                </div>

                <div>

                    <SimulatorText>

                        {section.title}

                    </SimulatorText>

                </div>

            </div>

            <div className="text-center">

                <div className="text-xs uppercase tracking-wider text-gray-400">

                    Question

                </div>

                <div className="text-lg font-semibold">

                    {currentQuestion} / {totalQuestions}

                </div>

            </div>

            <div className="text-right">

                <div className="text-xs uppercase tracking-wider text-gray-400">

                    Time Remaining

                </div>

                <div className="font-mono text-2xl font-bold">

                    {formattedTime}

                </div>

            </div>

        </header>

    );

}