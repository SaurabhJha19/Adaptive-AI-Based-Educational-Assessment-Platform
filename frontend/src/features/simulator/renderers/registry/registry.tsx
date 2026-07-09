import {

    RendererComponent,

} from "./types";

import ParagraphRenderer from "../ParagraphRenderer";
import HeadingRenderer from "../HeadingRenderer";
import EquationRenderer from "../EquationRenderer";
import TableRenderer from "../TableRenderer";
import ImageRenderer from "../ImageRenderer";
import GraphRenderer from "../GraphRenderer";
import ListRenderer from "../ListRenderer";
import QuoteRenderer from "../QuoteRenderer";
import CodeRenderer from "../CodeRenderer";
import DividerRenderer from "../DividerRenderer";
import UnknownRenderer from "../UnknownRenderer";

const wrap = (
    Component: React.ComponentType<any>,
    mapper: (block: any) => any
): RendererComponent => {

    const Wrapped: RendererComponent = ({ block }) => {

        return (
            <Component
                {...mapper(block)}
            />
        );

    };

    Wrapped.displayName = `Wrapped(${Component.displayName ?? Component.name ?? "Renderer"})`;

    return Wrapped;

};

export const RendererRegistry:
Record<
string,
RendererComponent
> = {

    paragraph:
        wrap(

            ParagraphRenderer,

            block => ({

                text:
                    block.data.text,

                spans:
                    block.data.spans,

            })

        ),

    heading:
        wrap(

            HeadingRenderer,

            block => ({

                text:
                    block.data.text,

                level:
                    block.data.level,

            })

        ),

    equation:
        wrap(

            EquationRenderer,

            block => ({

                latex:
                    block.data.latex,

                displayMode:
                    block.data.displayMode,

            })

        ),

    table:
        wrap(

            TableRenderer,

            block => ({

                headers:
                    block.data.headers,

                rows:
                    block.data.rows,

            })

        ),

    image:
        wrap(

            ImageRenderer,

            block => ({

                url:
                    block.data.imageUrl,

                caption:
                    block.data.caption,

            })

        ),

    graph:
        wrap(

            GraphRenderer,

            block => ({

                url:
                    block.data.imageUrl,

                caption:
                    block.data.caption,

            })

        ),

    list:
        wrap(

            ListRenderer,

            block => ({

                ordered:
                    block.data.ordered,

                items:
                    block.data.items,

            })

        ),

    quote:
        wrap(

            QuoteRenderer,

            block => ({

                text:
                    block.data.text,

            })

        ),

    code:
        wrap(

            CodeRenderer,

            block => ({

                code:
                    block.data.code,

            })

        ),

    divider:
        wrap(

            DividerRenderer,

            () => ({})

        ),

    unknown:

        UnknownRenderer,

};