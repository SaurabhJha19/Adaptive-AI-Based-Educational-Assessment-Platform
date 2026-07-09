interface Props {

    children: React.ReactNode;

}

export default function SimulatorText({

    children,

}: Props) {

    return (

        <p className="leading-7 text-muted-foreground">

            {children}

        </p>

    );

}