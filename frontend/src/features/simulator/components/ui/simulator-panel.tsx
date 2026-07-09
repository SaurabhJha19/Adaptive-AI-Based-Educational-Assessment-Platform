import { cn } from "@/lib/utils";

interface Props {

    children: React.ReactNode;

    className?: string;

}

export default function SimulatorPanel({

    children,

    className,

}: Props) {

    return (

        <section

            className={cn(

                "rounded-xl border bg-white",

                className

            )}

        >

            {children}

        </section>

    );

}