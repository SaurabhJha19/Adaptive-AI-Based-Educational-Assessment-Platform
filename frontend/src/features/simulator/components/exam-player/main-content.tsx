interface Props {
    question: any;
    answer?: string;
    onAnswer: (value: string) => void;
}

export default function MainContent({
    question,
    answer,
    onAnswer,
}: Props) {

    return (

        <main className="flex-1 overflow-y-auto bg-background">

            <div className="mx-auto max-w-5xl p-10">

                <div className="rounded-xl border bg-card shadow-sm">

                    {/* Passage */}

                    {question.passage && (

                        <div className="border-b p-8">

                            <h3 className="mb-4 text-lg font-semibold">

                                Passage

                            </h3>

                            <div className="whitespace-pre-wrap leading-8 text-muted-foreground">

                                {question.passage}

                            </div>

                        </div>

                    )}

                    {/* Question */}

                    <div className="p-8">

                        <div className="mb-3 text-sm font-medium text-muted-foreground">

                            Question {question.questionNumber}

                        </div>

                        <h2 className="mb-8 text-2xl font-semibold leading-9">

                            {question.prompt}

                        </h2>

                        <div className="space-y-4">

                            {question.options.map(
                                (option: string) => {

                                    const selected =
                                        answer === option;

                                    return (

                                        <button
                                            key={option}
                                            onClick={() =>
                                                onAnswer(option)
                                            }
                                            className={`flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-all

                                            ${
                                                selected
                                                    ? "border-primary bg-primary/10"
                                                    : "hover:bg-accent"
                                            }`}
                                        >

                                            <div
                                                className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border text-xs

                                                ${
                                                    selected
                                                        ? "border-primary bg-primary text-primary-foreground"
                                                        : ""
                                                }`}
                                            >
                                                {option.charAt(0)}
                                            </div>

                                            <div className="flex-1">

                                                {option}

                                            </div>

                                        </button>

                                    );

                                }
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </main>

    );

}