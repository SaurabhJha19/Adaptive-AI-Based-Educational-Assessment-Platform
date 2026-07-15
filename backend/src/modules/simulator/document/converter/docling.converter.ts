import { randomUUID } from "crypto";

import {
    UDMDocument,
    UDMNode,
    UDMPage
} from "../universal";

export class DoclingConverter {

    convert(
        document: any
    ): UDMDocument {

        const pageMap =
            new Map<number, UDMPage>();

        const readingOrder: UDMNode[] = [];

        const children =
            document.body?.children ?? [];

        for (const child of children) {

            const node =
                this.walk(
                    this.resolve(
                        child,
                        document
                    ),
                    document
                );

            this.flatten(
                node,
                readingOrder
            );

        }

        readingOrder.sort(
            (a, b) => {

                if (a.page !== b.page) {
                    return a.page - b.page;
                }

                if (!a.bbox || !b.bbox) {
                    return 0;
                }

                if (a.bbox.y !== b.bbox.y) {
                    return a.bbox.y - b.bbox.y;
                }

                return a.bbox.x - b.bbox.x;

            }
        );

        for (const node of readingOrder) {

            if (
                node.page <= 0
            ) {
                continue;
            }

            if (
                !pageMap.has(node.page)
            ) {

                pageMap.set(
                    node.page,
                    {
                        pageNumber:
                            node.page,
                        nodes: []
                    }
                );

            }

            pageMap
                .get(node.page)!
                .nodes
                .push(node);

        }

        return {

            id:
                randomUUID(),

            title:
                document.name ??
                "",

            pages:
                [...pageMap.values()],

            readingOrder,

            metadata: {}

        };

    }

    private resolve(
        node: any,
        document: any
    ): any {

        if (
            !node?.$ref
        ) {
            return node;
        }

        const path =
            node.$ref
                .replace(
                    "#/",
                    ""
                )
                .split("/");

        let current =
            document;

        for (const part of path) {

            current =
                current[
                    isNaN(
                        Number(part)
                    )
                        ? part
                        : Number(part)
                ];

        }

        return current;

    }

    private walk(
        node: any,
        document: any
    ): UDMNode {

        const children =
            (node.children ?? []).map(
                (child: any) =>
                    this.walk(
                        this.resolve(
                            child,
                            document
                        ),
                        document
                    )
            );

        const provenance =
            node.prov?.[0];

        const page =
            provenance?.page_no ??

            children.find(
                (c: UDMNode) =>
                    c.page > 0
            )?.page ??

            0;

        const bbox =
            provenance?.bbox ??

            children.find(
                (c: UDMNode) =>
                    c.bbox
            )?.bbox;

            return {

                id:
                    randomUUID(),

                type:
                    node.label ??
                    "unknown",

                page,

                text:
                    node.text ??
                    "",

                bbox,

                metadata:
                    node,

                children

            };

    }

    private flatten(
        node: UDMNode,
        result: UDMNode[]
    ) {

        result.push(
            node
        );

        for (const child of node.children) {

            this.flatten(
                child,
                result
            );

        }

    }

}