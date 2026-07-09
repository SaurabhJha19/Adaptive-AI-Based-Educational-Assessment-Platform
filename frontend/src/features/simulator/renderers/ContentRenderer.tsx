import {

    RendererRegistry,

} from "./registry";

import { RenderNode } from "./core";

interface ContentBlock {

    id?: string | number;

    type: string;

    data: Record<string, any>;

}

interface Props {

    blocks?: ContentBlock[];

}

export default function ContentRenderer({

    blocks = [],

}: Props) {

    if (!blocks.length) {

        return null;

    }

    return (

        <>

            {blocks.map(

    (

        block,

        index

    ) => {

        const Renderer =

            RendererRegistry[
                block.type
            ] ??

            RendererRegistry
                .unknown;

        return (

        <RenderNode
            key={block.id ?? index}
            node={{ ...block, id: String(block.id ?? index) }}
        />

        );

    }

)}

        </>

    );

}