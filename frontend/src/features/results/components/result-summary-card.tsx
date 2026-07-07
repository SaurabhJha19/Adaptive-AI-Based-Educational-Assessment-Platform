import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ResultSummary } from "../types";

type Props = {

    summary: ResultSummary;

};

export default function ResultSummaryCard({

    summary,

}: Props) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Result Summary

                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="grid gap-6 md:grid-cols-4">

                    <div>

                        <p className="text-sm text-muted-foreground">

                            Score

                        </p>

                        <h2 className="text-3xl font-bold">

                            {summary.score}

                        </h2>

                    </div>

                    <div>

                        <p className="text-sm text-muted-foreground">

                            Percentage

                        </p>

                        <h2 className="text-3xl font-bold">

                            {summary.percentage.toFixed(1)}%

                        </h2>

                    </div>

                    <div>

                        <p className="text-sm text-muted-foreground">

                            Correct

                        </p>

                        <h2 className="text-3xl font-bold text-green-600">

                            {summary.correct}

                        </h2>

                    </div>

                    <div>

                        <p className="text-sm text-muted-foreground">

                            Incorrect

                        </p>

                        <h2 className="text-3xl font-bold text-red-600">

                            {summary.incorrect}

                        </h2>

                    </div>

                </div>

            </CardContent>

        </Card>

    );

}