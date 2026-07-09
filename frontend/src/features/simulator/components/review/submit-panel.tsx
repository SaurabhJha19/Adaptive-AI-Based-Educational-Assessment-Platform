import {

    SimulatorButton,

} from "../ui";

interface Props {

    onBack: () => void;

    onSubmit: () => void;

}

export default function SubmitPanel({

    onBack,

    onSubmit,

}: Props) {

    return (

        <div className="flex justify-between">

            <SimulatorButton

                onClick={onBack}

            >

                Back to Exam

            </SimulatorButton>

            <SimulatorButton

                variantType="primary"

                onClick={onSubmit}

            >

                Submit Exam

            </SimulatorButton>

        </div>

    );

}