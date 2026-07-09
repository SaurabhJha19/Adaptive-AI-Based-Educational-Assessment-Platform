import {
    SimulatorHeading,
    SimulatorText,
} from "../ui";

interface Props {

    current: number;

    total: number;

}

export default function TransitionHeader({

    current,

    total,

}: Props) {

    return (

        <div className="space-y-3 text-center">

            <SimulatorHeading>

                Module {current} Complete

            </SimulatorHeading>

            <SimulatorText>

                Prepare to begin Module {current + 1} of {total}.

            </SimulatorText>

        </div>

    );

}