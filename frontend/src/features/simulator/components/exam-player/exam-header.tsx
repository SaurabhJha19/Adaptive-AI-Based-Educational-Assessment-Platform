import Timer from "./timer";

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

        <div className="flex items-center justify-between border-b bg-white px-8 py-5">

            <div>

                <h1 className="text-2xl font-bold">

                    {exam.title}

                </h1>

                <p className="mt-1 text-gray-500">

                    {section.title}

                </p>

            </div>

            <div className="text-center">

                <div className="text-sm text-gray-500">

                    Question

                </div>

                <div className="font-semibold">

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