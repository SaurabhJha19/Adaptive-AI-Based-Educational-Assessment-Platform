interface Props {

    children: React.ReactNode;

}

export default function SimulatorHeading({

    children,

}: Props) {

    return (

        <h2 className="text-xl font-semibold tracking-tight">

            {children}

        </h2>

    );

}