import {

    SimulatorButton,

} from "../ui";

interface Props {

    onContinue: () => void;

}

export default function TransitionActions({

    onContinue,

}: Props) {

    return (

        <div className="flex justify-center">

            <SimulatorButton

                variantType="primary"

                className="w-64"

                onClick={onContinue}

            >

                Begin Next Module

            </SimulatorButton>

        </div>

    );

}