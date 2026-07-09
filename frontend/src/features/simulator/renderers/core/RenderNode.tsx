import { RendererRegistry } from "../registry";

import {

    RenderNode as Node,

} from "./types";

interface Props {

    node: Node;

}

export default function RenderNode({

    node,

}: Props) {

    const Renderer =

        RendererRegistry[
            node.type
        ] ??

        RendererRegistry
            .unknown;

    return (

        <Renderer

            block={node}

        />

    );

}