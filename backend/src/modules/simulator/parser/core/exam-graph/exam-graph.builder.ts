import {

    ParsedDocument,

} from "../../../document/core";

import {

    GraphNode,

    ExamGraph,

} from "./exam-graph.interfaces";

import {

    GraphNodeType,

} from "./exam-graph.types";

import {

    createNode,

    attachBlock,

} from "./node.factory";

export class ExamGraphBuilder {

    build(

        document: ParsedDocument

    ): ExamGraph {

        const root =

            createNode(

                GraphNodeType.DOCUMENT,

                1

            );

        root.pageEnd =

            document.pages.length;

        for (

            const page

            of document.pages

        ) {

            const pageNode =

                createNode(

                    GraphNodeType.PARAGRAPH,

                    page.pageNumber

                );

            for (

                const block

                of page.blocks

            ) {

                attachBlock(

                    pageNode,

                    block

                );

            }

            root.children.push(

                pageNode

            );

        }

        return {

            root,

        };

    }

}