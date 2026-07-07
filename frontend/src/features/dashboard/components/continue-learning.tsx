import Link from "next/link";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type Props = {

    attempt: any;

};

export default function ContinueLearning({

    attempt,

}: Props) {

    if (!attempt) {

        return (

            <Card className="rounded-2xl border shadow-sm">

                <CardHeader>

                    <CardTitle>

                        Continue Learning

                    </CardTitle>

                </CardHeader>

                <CardContent className="space-y-4">

                    <p className="text-muted-foreground">

                        No unfinished assessment.

                    </p>

                    <Button asChild>

                        <Link href="/simulator">

                            Start New Assessment

                        </Link>

                    </Button>

                </CardContent>

            </Card>

        );

    }

    return (

        <Card className="rounded-2xl border shadow-sm">

            <CardHeader>

                <CardTitle>

                    Continue Learning

                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-5 p-6">

                <div>

                    <h3 className="font-semibold text-lg">

                        {

                            attempt.title ??

                            "Assessment"

                        }

                    </h3>

                    <p className="text-muted-foreground">

                        Status: {attempt.status}

                    </p>

                </div>

                <Button asChild>

                    <Link

                        href={`/simulator/${attempt._id}`}

                    >

                        Resume Assessment

                    </Link>

                </Button>

            </CardContent>

        </Card>

    );

}