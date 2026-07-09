import Timer from "./timer";
import {

    SimulatorHeading,

    SimulatorText,

} from "../ui";

interface Props {

    exam: any;

    section: any;

    currentQuestion: number;

    totalQuestions: number;

}

export default function ExamHeader({

    exam,

    section,

    currentQuestion,

    totalQuestions,

}: Props) {

    return (

        <div className="flex h-16 items-center justify-between border-b bg-white px-8">

            <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black font-bold text-white">

                    AI

                </div>

                <div>

                    <SimulatorHeading>
                        {exam.title}

                   </SimulatorHeading>

                    <SimulatorText>

                        {section.title}

                    </SimulatorText>

                </div>

            </div>

            <div className="text-center">

                <div className="text-xs uppercase tracking-widest text-gray-400">

                    Question

                </div>

                <div className="text-lg font-semibold">

                    {currentQuestion} / {totalQuestions}

                </div>

            </div>

            <Timer

                initialSeconds={

                    section.duration

                        ? section.duration * 60

                        : exam.duration * 60

                }

            />

        </div>

    );

}