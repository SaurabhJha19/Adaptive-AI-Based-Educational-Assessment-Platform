import { randomUUID } from "crypto";

import { AnyBlock } from "../../../document/core";

import { GraphNode } from "./exam-graph.interfaces";

import { GraphNodeType } from "./exam-graph.types";

export function createNode(

    type: GraphNodeType,

    page: number

): GraphNode {

    return {

        id: randomUUID(),

        type,

        pageStart: page,

        pageEnd: page,

        blocks: [],

        children: [],

        metadata: {},

    };

}

export function attachBlock(

    node: GraphNode,

    block: AnyBlock

) {

    node.blocks.push(block);

}