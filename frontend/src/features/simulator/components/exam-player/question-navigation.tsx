import { SimulatorButton } from "../ui";

interface Props {

    onPrevious: () => void;

    onNext: () => void;

    onMarkReview: () => void;

    onReviewScreen: () => void;

    reviewed: boolean;

    unansweredCount: number;

}

export default function QuestionNavigation({

    onPrevious,

    onNext,

    onMarkReview,

    onReviewScreen,

    reviewed,

    unansweredCount,

}: Props) {

    return (

        <div className="flex w-full items-center justify-between">

            <SimulatorButton

                variantType="secondary"

                onClick={onPrevious}

                className="w-36"

            >

                Previous

            </SimulatorButton>

            <div className="flex gap-4">

                <SimulatorButton

                    variantType={

                        reviewed

                            ? "success"

                            : "secondary"

                    }

                    onClick={onMarkReview}

                    className="w-48"

                >

                    {

                        reviewed

                            ? "Marked"

                            : "Mark for Review"

                    }

                </SimulatorButton>

                <SimulatorButton

                    variantType={

                        unansweredCount > 0

                            ? "danger"

                            : "primary"

                    }

                    onClick={onReviewScreen}

                    className="w-48"

                >

                    {

                        unansweredCount > 0

                            ? `Review (${unansweredCount})`

                            : "Review Answers"

                    }

                </SimulatorButton>

            </div>

            <SimulatorButton

                variantType="primary"

                onClick={onNext}

                className="w-36"

            >

                Next

            </SimulatorButton>

        </div>

    );

}