"use client";

import { ContentRenderer } from "../../renderers";
import {
    SimulatorHeading,
    SimulatorText,
} from "../ui";

interface Props {
    group?: any;
}

export default function PassagePanel({
    group,
}: Props) {

    if (!group) {
        return (
            <div className="flex h-full items-center justify-center text-gray-400">
                No passage available.
            </div>
        );
    }

    const hasRichContent =
        Array.isArray(group.content) &&
        group.content.length > 0;

    return (
        <div className="flex h-full flex-col">

            <div className="sticky top-0 z-10 border-b bg-white px-8 py-5">

                <SimulatorHeading>
                    {group.title || "Reading Passage"}
                </SimulatorHeading>

            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">

                {hasRichContent ? (

                    <ContentRenderer
                        blocks={group.content}
                    />

                ) : (

                    <SimulatorText>

                        {group.passage}

                    </SimulatorText>

                )}

            </div>

        </div>
    );
}