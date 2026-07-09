import { RenderNode } from "./core";

interface Props {

    block: any;

}

export default function UnknownRenderer({

    block,

}: Props) {

    return (

        <div className="my-4 rounded border border-yellow-400 bg-yellow-50 p-4">

            <strong>

                Unsupported block:

            </strong>

            <pre className="mt-2 overflow-auto text-sm">

                {JSON.stringify(

                    block,

                    null,

                    2

                )}

            </pre>

            {

                block.children?.length > 0 && (

                    <div className="ml-6 mt-4">

                        {block.children.map(

                            (child: any) => (

                                <RenderNode

                                    key={child.id}

                                    node={child}

                                />

                            )

                        )}

                    </div>

                )

            }

        </div>

    );

}