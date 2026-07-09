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

        <div className="flex h-screen flex-col bg-white">

            <header className="border-b">

                {header}

            </header>

            <main className="flex min-h-0 flex-1">

                {workspace}

            </main>

            <footer className="border-t">

                {footer}

            </footer>

        </div>

    );

}