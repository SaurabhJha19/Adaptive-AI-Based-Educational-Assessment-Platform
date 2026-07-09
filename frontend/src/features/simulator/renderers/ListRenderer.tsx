interface Props {

    ordered: boolean;

    items: string[];

}

export default function ListRenderer({

    ordered,

    items,

}: Props) {

    const Tag =
        ordered
            ? "ol"
            : "ul";

    return (

        <Tag className="mb-4 ml-6 list-disc">

            {items.map(item => (

                <li key={item}>

                    {item}

                </li>

            ))}

        </Tag>

    );

}