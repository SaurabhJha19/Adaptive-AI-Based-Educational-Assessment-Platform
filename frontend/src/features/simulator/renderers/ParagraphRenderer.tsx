import {

    RichText,

} from "./rich-text";

interface Props {

    text?: string;

    spans?: any[];

}

export default function ParagraphRenderer({

    text,

    spans,

}: Props) {

    return (

<p className="mb-4 whitespace-pre-wrap leading-7">

    {

        spans?.length

        ?

        <RichText

            spans={spans}

        />

        :

        text

    }

</p>

    );

}