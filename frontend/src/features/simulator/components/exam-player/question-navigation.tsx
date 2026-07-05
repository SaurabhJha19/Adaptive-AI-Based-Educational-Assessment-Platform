interface Props {
    onPrevious: () => void;
    onNext: () => void;
    onReview: () => void;
    reviewed: boolean;
}

export default function QuestionNavigation({
    onPrevious,
    onNext,
    onReview,
    reviewed,
}: Props) {

    return (

        <div className="flex items-center justify-between border-t bg-white p-6">

            <button
                onClick={onPrevious}
                className="rounded-md border px-6 py-2"
            >
                Previous
            </button>

            <button
                onClick={onReview}
                className={`rounded-md px-6 py-2 ${
                    reviewed
                        ? "bg-yellow-500 text-white"
                        : "border"
                }`}
            >
                {reviewed
                    ? "Marked"
                    : "Mark for Review"}
            </button>

            <button
                onClick={onNext}
                className="rounded-md bg-black px-6 py-2 text-white"
            >
                Next
            </button>

        </div>

    );

}