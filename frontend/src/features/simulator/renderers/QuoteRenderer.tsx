interface Props {

    text: string;

}

export default function QuoteRenderer({

    text,

}: Props) {

    return (

        <blockquote className="my-6 border-l-4 pl-4 italic text-gray-600">

            {text}

        </blockquote>

    );

}