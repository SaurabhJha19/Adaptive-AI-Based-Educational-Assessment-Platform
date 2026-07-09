import {

    SimulatorStatus,

} from "../ui";

export default function ReviewLegend() {

    return (

        <div className="flex gap-8">

            <div className="flex items-center gap-2">

                <SimulatorStatus color="answered"/>

                Answered

            </div>

            <div className="flex items-center gap-2">

                <SimulatorStatus color="review"/>

                Marked

            </div>

            <div className="flex items-center gap-2">

                <SimulatorStatus color="unanswered"/>

                Unanswered

            </div>

            <div className="flex items-center gap-2">

                <SimulatorStatus color="current"/>

                Current

            </div>

        </div>

    );

}