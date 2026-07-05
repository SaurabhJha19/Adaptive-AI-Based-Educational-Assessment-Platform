interface Props {
    onPrevious: () => void;
    onNext: () => void;
    onReview: () => void;
    reviewed: boolean;
}

export default function BottomNavigation({
    onPrevious,
    onNext,
    onReview,
    reviewed,
}: Props) {

    return (

        <footer className="border-t bg-card">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

                {/* Left */}

                <button
                    onClick={onPrevious}
                    className="rounded-lg border px-6 py-3 text-sm font-medium transition hover:bg-accent"
                >
                    ← Previous
                </button>

                {/* Center */}

                <button
                    onClick={onReview}
                    className={`rounded-lg px-6 py-3 text-sm font-medium transition

                    ${
                        reviewed
                            ? "bg-yellow-400 text-black"
                            : "border hover:bg-accent"
                    }`}
                >
                    {reviewed
                        ? "★ Marked for Review"
                        : "☆ Mark for Review"}
                </button>

                {/* Right */}

                <button
                    onClick={onNext}
                    className="rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                    Next →
                </button>

            </div>

        </footer>

    );

}