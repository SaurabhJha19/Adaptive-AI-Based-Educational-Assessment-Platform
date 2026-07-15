import { AnyBlock } from "../../../document/core";

import { GraphNodeType } from "./exam-graph.types";

export interface GraphNode {

    id: string;

    type: GraphNodeType;

    title?: string;

    pageStart: number;

    pageEnd: number;

    blocks: AnyBlock[];

    children: GraphNode[];

    metadata: Record<string, unknown>;

}

export interface ExamGraph {

    root: GraphNode;

}