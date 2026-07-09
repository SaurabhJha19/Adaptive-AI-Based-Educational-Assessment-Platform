interface Props {

    text: string;

    level?: number;

}

export default function HeadingRenderer({

    text,

    level = 2,

}: Props) {

    const Tag =
        `h${level}` as keyof JSX.IntrinsicElements;

    return (

        <Tag className="mb-4 font-bold">

            {text}

        </Tag>

    );

}