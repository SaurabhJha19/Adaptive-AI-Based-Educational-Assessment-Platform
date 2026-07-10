import { SimulatorButton } from "../ui";

interface Props {

    onPrevious: () => void;

    onNext: () => void;

    onMarkReview: () => void;

    onReviewScreen: () => void;

    onSubmit?: () => void;

    reviewed: boolean;

    unansweredCount: number;

    isSubmitting?: boolean;

    isLastQuestion: boolean;

}

export default function QuestionNavigation({

    onPrevious,

    onNext,

    onMarkReview,

    onReviewScreen,

    reviewed,

    unansweredCount,

    isSubmitting,

    isLastQuestion,

}: Props) {

    return (

        <div className="flex w-full items-center justify-between">

            <div className="flex items-center gap-3">

                <SimulatorButton

                    variantType="secondary"

                    onClick={onPrevious}

                >

                    Previous

                </SimulatorButton>

                <SimulatorButton

                    variantType={

                        reviewed

                            ? "danger"

                            : "secondary"

                    }

                    onClick={onMarkReview}

                >

                    {

                        reviewed

                            ? "Unmark"

                            : "Mark for Review"

                    }

                </SimulatorButton>

            </div>

            <div className="flex items-center gap-3">

                <span className="text-sm text-gray-500">

                    {unansweredCount} unanswered

                </span>

                <SimulatorButton

                    variantType="primary"

                    onClick={

                        isLastQuestion

                            ? onReviewScreen

                            : onNext

                    }

                    disabled={isSubmitting}

                >

                    {

                        isLastQuestion

                            ? "Review Answers"

                            : "Next"

                    }

                </SimulatorButton>

            </div>

        </div>

    );

}