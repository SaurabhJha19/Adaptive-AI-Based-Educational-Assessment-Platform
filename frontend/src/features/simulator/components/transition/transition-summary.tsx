import {

    SimulatorPanel,

} from "../ui";

export default function TransitionSummary() {

    return (

        <SimulatorPanel className="space-y-4 p-6">

            <h3 className="font-semibold">

                Before continuing

            </h3>

            <ul className="list-disc space-y-2 pl-6">

                <li>

                    The timer will restart.

                </li>

                <li>

                    The previous module will be locked.

                </li>

                <li>

                    You cannot return after continuing.

                </li>

            </ul>

        </SimulatorPanel>

    );

}