interface Props {

    code: string;

}

export default function CodeRenderer({

    code,

}: Props) {

    return (

        <pre className="my-6 overflow-auto rounded bg-gray-900 p-4 text-white">

            <code>

                {code}

            </code>

        </pre>

    );

}