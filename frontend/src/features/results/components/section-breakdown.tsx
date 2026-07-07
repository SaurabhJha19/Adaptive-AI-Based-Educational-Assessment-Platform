import {

    Card,

    CardContent,

    CardHeader,

    CardTitle,

} from "@/components/ui/card";

import { SectionResult } from "../types";

type Props = {

    sections: SectionResult[];

};

export default function SectionBreakdown({

    sections,

}: Props) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Section Performance

                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

                {

                    sections.map(

                        section => (

                            <div

                                key={section.section}

                                className="rounded-lg border p-4"

                            >

                                <div className="flex justify-between">

                                    <h3 className="font-semibold">

                                        {section.section}

                                    </h3>

                                    <span>

                                        {section.percentage.toFixed(1)}%

                                    </span>

                                </div>

                                <p className="mt-2 text-sm text-muted-foreground">

                                    {section.correct}

                                    {" / "}

                                    {section.total}

                                    {" Correct"}

                                </p>

                            </div>

                        )

                    )

                }

            </CardContent>

        </Card>

    );

}