interface Props {
    questions: any[];
    currentQuestion: number;

    answers: Record<string, string>;

    marked: string[];

    onSelectQuestion: (
        index: number
    ) => void;
}

export default function LeftSidebar({
    questions,
    currentQuestion,
    answers,
    marked,
    onSelectQuestion,
}: Props) {

    return (

        <aside className="w-72 border-r bg-card flex flex-col">

            <div className="border-b p-5">

                <h2 className="text-lg font-semibold">

                    Questions

                </h2>

                <p className="text-sm text-muted-foreground mt-1">

                    Navigate through the module.

                </p>

            </div>

            <div className="flex-1 overflow-y-auto p-5">

                <div className="grid grid-cols-5 gap-3">

                    {questions.map(
                        (
                            question,
                            index
                        ) => {

                            const key =
                                question._id ??
                                question.questionNumber;

                            const answered =
                                !!answers[key];

                            const review =
                                marked.includes(key);

                            const active =
                                question.questionNumber ===
                                currentQuestion;

                            let className =
                                "flex h-11 w-11 items-center justify-center rounded-lg border text-sm font-medium transition-all ";

                            if (active) {

                                className +=
                                    "bg-primary text-primary-foreground border-primary";

                            } else if (review) {

                                className +=
                                    "bg-yellow-400 text-black border-yellow-400";

                            } else if (answered) {

                                className +=
                                    "bg-green-500 text-white border-green-500";

                            } else {

                                className +=
                                    "hover:bg-accent";

                            }

                            return (

                                <button
                                    key={key}
                                    onClick={() =>
                                        onSelectQuestion(index)
                                    }
                                    className={className}
                                >
                                    {
                                        question.questionNumber
                                    }
                                </button>

                            );

                        }
                    )}

                </div>

            </div>

            <div className="border-t p-5 space-y-3 text-sm">

                <div className="flex items-center gap-2">

                    <div className="h-4 w-4 rounded bg-primary" />

                    Current

                </div>

                <div className="flex items-center gap-2">

                    <div className="h-4 w-4 rounded bg-green-500" />

                    Answered

                </div>

                <div className="flex items-center gap-2">

                    <div className="h-4 w-4 rounded bg-yellow-400" />

                    Marked

                </div>

                <div className="flex items-center gap-2">

                    <div className="h-4 w-4 rounded border" />

                    Unanswered

                </div>

            </div>

        </aside>

    );

}