import {
    SimulatorHeading,
    SimulatorText,
} from "../ui";

interface Props {

    title: string;

    section: string;

}

export default function ReviewHeader({

    title,

    section,

}: Props) {

    return (

        <div className="space-y-2">

            <SimulatorHeading>

                {title}

            </SimulatorHeading>

            <SimulatorText>

                {section}

            </SimulatorText>

        </div>

    );

}