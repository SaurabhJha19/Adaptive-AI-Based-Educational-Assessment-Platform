import {

    SimulatorPanel,

} from "../ui";

interface Props {

    children: React.ReactNode;

}

export default function QuestionPanel({

    children,

}: Props) {

    return (

        <SimulatorPanel className="flex h-full flex-col rounded-none border-0">

            <div className="question-scroll flex-1 overflow-y-auto p-8">

                {children}

            </div>

        </SimulatorPanel>

    );

}