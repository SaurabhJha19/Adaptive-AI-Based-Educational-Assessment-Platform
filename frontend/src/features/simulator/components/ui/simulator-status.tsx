interface Props {

    color:

        | "answered"

        | "review"

        | "current"

        | "unanswered";

}

export default function SimulatorStatus({

    color,

}: Props) {

    const styles = {

        answered:

            "bg-green-500",

        review:

            "bg-yellow-500",

        current:

            "bg-blue-600",

        unanswered:

            "bg-gray-300",

    };

    return (

        <span

            className={`inline-block h-3 w-3 rounded-full ${styles[color]}`}

        />

    );

}