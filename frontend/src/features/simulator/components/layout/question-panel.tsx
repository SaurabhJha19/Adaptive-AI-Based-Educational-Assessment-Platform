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

        <SimulatorPanel className="h-full rounded-none border-0 shadow-none">

            <div className="flex h-full flex-col">

                <div className="sticky top-0 z-10 border-b bg-white px-8 py-5">

                    <h2 className="text-xl font-semibold">

                        Question

                    </h2>

                </div>

                <div className="question-scroll flex-1 overflow-y-auto px-8 py-8">

                    {children}

                </div>

            </div>

        </SimulatorPanel>

    );

}