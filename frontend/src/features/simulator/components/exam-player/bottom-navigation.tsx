"use client";

interface Props {

    currentQuestion: number;

    totalQuestions: number;

    isLastQuestionOfExam: boolean;

    onPrevious: () => void;

    onNext: () => void;

    onReview: () => void;

    reviewed: boolean;

    onSubmit: () => void;

    isSubmitting: boolean;

}

export default function BottomNavigation({

    currentQuestion,

    isLastQuestionOfExam,

    onPrevious,

    onNext,

    onReview,

    reviewed,

    onSubmit,

    isSubmitting,

}: Props) {

    const isFirst =
        currentQuestion === 1;

        const isLast =
    isLastQuestionOfExam;

    return (

        <div className="flex w-full items-center justify-between border-t bg-white px-6 py-4">

            <button
                disabled={isFirst}
                onClick={onPrevious}
                className="rounded-lg border px-5 py-2 disabled:opacity-50"
            >
                Previous
            </button>

            <div className="flex flex-wrap items-center justify-end gap-3">

                <button
                    onClick={onReview}
                    className={`rounded-lg px-5 py-2 whitespace-nowrap ${
                        reviewed
                            ? "bg-yellow-500 text-white"
                            : "border"
                    }`}
                >
                    {reviewed
                        ? "Reviewed"
                        : "Mark for Review"}
                </button>

                {

                    !isLast && (

                        <button
                            onClick={onNext}
                            className="rounded-lg bg-white px-6 py-2 text-back whitespace-nowrap"
                        >
                            Next →
                        </button>

                    )

                }

                {

                    isLast && (

                        <button
                            onClick={onSubmit}
                            disabled={isSubmitting}
                            className="rounded-lg bg-green-600 px-6 py-2 text-white whitespace-nowrap disabled:opacity-50"
                        >
                            {
                                isSubmitting
                                    ? "Submitting..."
                                    : "Submit Exam"
                            }
                        </button>

                    )

                }

            </div>

        </div>

    );

}