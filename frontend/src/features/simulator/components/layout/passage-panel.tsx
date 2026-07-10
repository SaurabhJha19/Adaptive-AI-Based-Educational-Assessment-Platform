"use client";

import { ContentRenderer } from "../../renderers";

interface Props {

    group?: any;

}

export default function PassagePanel({

    group,

}: Props) {

    if (

        !group ||

        !group.content ||

        group.content.length === 0

    ) {

        return (

            <div className="flex h-full items-center justify-center text-gray-400">

                No passage available.

            </div>

        );

    }

    return (

        <div className="flex h-full flex-col">

            <div className="sticky top-0 z-10 border-b bg-white px-8 py-5">

                <h2 className="text-xl font-semibold">

                    {

                        group.title ??

                        "Reading Passage"

                    }

                </h2>

            </div>

            <div className="flex-1 overflow-y-auto px-10 py-8">

                <div className="mx-auto max-w-3xl leading-8 text-[17px]">

                    <ContentRenderer

                        blocks={group.content}

                    />

                </div>

            </div>

        </div>

    );

}