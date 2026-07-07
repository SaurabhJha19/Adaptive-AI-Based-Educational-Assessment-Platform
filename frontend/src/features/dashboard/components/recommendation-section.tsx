import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type Props = {
    recommendation?: {
        title: string;
        description: string;
    } | null;
};

export default function RecommendationSection({
    recommendation,
}: Props) {

    if (!recommendation) {
        return (
           <Card className="rounded-2xl border shadow-sm">
                <CardHeader>
                    <CardTitle>
                        Today&apos;s Recommendation
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-6">
                    <p className="text-muted-foreground">
                        No recommendations available.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Today&apos;s Recommendation
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

                <div>

                    <h3 className="text-lg font-semibold">
                        {recommendation.title}
                    </h3>

                    <p className="text-muted-foreground">
                        {recommendation.description}
                    </p>

                </div>

            </CardContent>
        </Card>
    );
}