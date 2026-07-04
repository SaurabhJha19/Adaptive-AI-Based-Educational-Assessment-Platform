"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import PublishDialog from "./publish-dialog";
import DeleteDialog from "./delete-dialog";

import { OfficialExam } from "../types";

interface Props {
    exam: OfficialExam;
}

export default function ReviewPage({
    exam,
}: Props) {

    return (

        <div className="space-y-6">

            <Card>

                <CardHeader>

                    <CardTitle>

                        Official Exam Review

                    </CardTitle>

                </CardHeader>

                <CardContent className="space-y-5">

                    <div className="grid grid-cols-2 gap-6">

                        <Info
                            label="Exam Code"
                            value={exam.examCode}
                        />

                        <Info
                            label="Title"
                            value={exam.title}
                        />

                        <Info
                            label="Exam Type"
                            value={exam.examType}
                        />

                        <Info
                            label="Questions"
                            value={
                                exam.totalQuestions.toString()
                            }
                        />

                        <Info
                            label="Created"
                            value={
                                new Date(
                                    exam.createdAt
                                ).toLocaleString()
                            }
                        />

                        <Info
                            label="Updated"
                            value={
                                new Date(
                                    exam.updatedAt
                                ).toLocaleString()
                            }
                        />

                    </div>

                    <div>

                        <p className="text-sm text-muted-foreground mb-2">

                            Status

                        </p>

                        <Badge>

                            {exam.status}

                        </Badge>

                    </div>

                    <div className="flex gap-3 pt-4">

                        {exam.status !== "published" && (

                            <PublishDialog
                                examId={exam._id}
                            />

                        )}

                        <DeleteDialog
                            examId={exam._id}
                        />

                    </div>

                </CardContent>

            </Card>

        </div>

    );

}

function Info({
    label,
    value,
}: {
    label: string;
    value: string;
}) {

    return (

        <div>

            <p className="text-sm text-muted-foreground">

                {label}

            </p>

            <p className="font-medium">

                {value}

            </p>

        </div>

    );

}