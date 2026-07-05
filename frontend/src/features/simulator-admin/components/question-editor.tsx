"use client";

import { Card } from "@/components/ui/card";

interface Props {
    section: any;
}

export default function QuestionEditor({
    section,
}: Props) {

    return (

        <Card className="p-6">

            <h2 className="text-xl font-semibold mb-5">
                {section.title}
            </h2>

            {section.questionGroups?.length === 0 && (

                <p className="text-muted-foreground">

                    No question groups yet.

                </p>

            )}

            {section.questionGroups?.map(
                (
                    group: any,
                    groupIndex: number
                ) => (

                    <Card
                        key={groupIndex}
                        className="mb-4 p-4"
                    >

                        <h3 className="font-medium">

                            Group {groupIndex + 1}

                        </h3>

                        {group.questions?.map(
                            (
                                question: any,
                                qIndex: number
                            ) => (

                                <div
                                    key={qIndex}
                                    className="border rounded-lg p-3 mt-3"
                                >

                                    <p>

                                        <strong>

                                            Q{qIndex + 1}

                                        </strong>

                                    </p>

                                    <textarea
                                        defaultValue={
                                            question.question
                                        }
                                        className="w-full mt-2 rounded-md border bg-background p-3"
                                        rows={3}
                                    />

                                </div>

                            )
                        )}

                    </Card>

                )
            )}

        </Card>

    );

}