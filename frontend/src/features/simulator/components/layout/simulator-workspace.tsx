import SplitPane

from "./split-pane/SplitPane";

interface Props {

    left: React.ReactNode;

    right: React.ReactNode;

}

export default function SimulatorWorkspace({

    left,

    right,

}: Props) {

    return (

        <SplitPane

            defaultWidth={45}

            left={left}

            right={right}

        />

    );

}