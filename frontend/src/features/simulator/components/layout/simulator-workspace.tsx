interface Props {

    content: React.ReactNode;

    sidebar: React.ReactNode;

}

export default function SimulatorWorkspace({

    content,

    sidebar,

}: Props) {

    return (

        <div className="flex h-full">

            <div className="min-w-0 flex-1">

                {content}

            </div>

            <aside className="w-[300px] shrink-0 border-l bg-white">

                {sidebar}

            </aside>

        </div>

    );

}