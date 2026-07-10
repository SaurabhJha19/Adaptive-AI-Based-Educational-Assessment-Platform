interface Props {

    header: React.ReactNode;

    workspace: React.ReactNode;

    footer: React.ReactNode;

}

export default function SimulatorLayout({

    header,

    workspace,

    footer,

}: Props) {

    return (

        <div className="flex h-screen overflow-hidden bg-[#f4f6fb]">

            <div className="flex min-w-0 flex-1 flex-col">

                <header className="shrink-0">

                    {header}

                </header>

                <main className="min-h-0 flex-1 overflow-hidden">

                    {workspace}

                </main>

                <footer className="shrink-0 border-t bg-white">

                    {footer}

                </footer>

            </div>

        </div>

    );

}