import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props
extends React.ComponentProps<typeof Button> {

    variantType?:
        | "primary"
        | "secondary"
        | "danger"
        | "success";

}

export default function SimulatorButton({

    variantType = "secondary",

    className,

    ...props

}: Props) {

    const styles = {

        primary:

            "bg-blue-600 hover:bg-blue-700 text-white",

        secondary:

            "border bg-white hover:bg-gray-100",

        danger:

            "bg-red-600 hover:bg-red-700 text-white",

        success:

            "bg-green-600 hover:bg-green-700 text-white",

    };

    return (

        <Button

            className={cn(

                "h-11 rounded-lg px-6",

                styles[variantType],

                className

            )}

            {...props}

        />

    );

}