"use client";

import Link from "next/link";

import PageContainer from "@/components/shared/page-container";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useResults } from "@/features/results/hooks/use-results";

export default function ResultsPage() {

    const {

        data,

        isLoading,

    } = useResults();

    if (isLoading) {

        return (

            <PageContainer>

                Loading...

            </PageContainer>

        );

    }

    return (

        <PageContainer>

            <div className="space-y-8">

                <div>

                    <h1 className="text-3xl font-bold">

                        Assessment History

                    </h1>

                    <p className="text-muted-foreground">

                        Review all completed assessments.

                    </p>

                </div>

                {

                    data?.length === 0 && (

                        <Card className="p-10 text-center">

                            No completed assessments.

                        </Card>

                    )

                }

                <div className="grid gap-5">

                    {

                        data?.map(

                            (attempt: any) => (

                                <Card

                                    key={attempt._id}

                                    className="flex items-center justify-between p-6"

                                >

                                    <div>

                                        <h3 className="font-semibold">

                                            {

                                                attempt.sourceType === "generated"

                                                    ? "AI Assessment"

                                                    : "Official Simulator"

                                            }

                                        </h3>

                                        <p className="text-sm text-muted-foreground">

                                            Score

                                            {" "}

                                            {attempt.score}

                                            /

                                            {

                                                attempt.totalQuestions

                                            }

                                        </p>

                                    </div>

                                    <Button asChild>

                                        <Link

                                            href={`/results/${attempt._id}`}

                                        >

                                            View Result

                                        </Link>

                                    </Button>

                                </Card>

                            )

                        )

                    }

                </div>

            </div>

        </PageContainer>

    );

}