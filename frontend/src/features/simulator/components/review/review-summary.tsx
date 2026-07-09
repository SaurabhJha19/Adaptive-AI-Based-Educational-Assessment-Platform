import {

    SimulatorBadge,

} from "../ui";

interface Props {

    answered: number;

    review: number;

    unanswered: number;

}

export default function ReviewSummary({

    answered,

    review,

    unanswered,

}: Props) {

    return (

        <div className="grid grid-cols-3 gap-4">

            <div className="rounded-lg border p-4">

                <div className="text-sm text-muted-foreground">

                    Answered

                </div>

                <div className="mt-2 flex items-center gap-2">

                    <SimulatorBadge>

                        {answered}

                    </SimulatorBadge>

                </div>

            </div>

            <div className="rounded-lg border p-4">

                <div className="text-sm text-muted-foreground">

                    Marked

                </div>

                <div className="mt-2">

                    <SimulatorBadge>

                        {review}

                    </SimulatorBadge>

                </div>

            </div>

            <div className="rounded-lg border p-4">

                <div className="text-sm text-muted-foreground">

                    Unanswered

                </div>

                <div className="mt-2">

                    <SimulatorBadge>

                        {unanswered}

                    </SimulatorBadge>

                </div>

            </div>

        </div>

    );

}