import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {

    recentExams: any[];

};

export default function PerformanceSection({

    recentExams,

}: Props) {

    return (

        <Card className="rounded-2xl border shadow-sm">

            <CardHeader>

                <CardTitle>

                    Performance Trend

                </CardTitle>

            </CardHeader>

            <CardContent className="p-6">

                <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">

                    {recentExams.length === 0

                        ? "No performance data."

                        : "Performance chart will be added next."}

                </div>

            </CardContent>

        </Card>

    );

}