import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {

    activity: any[];

};

export default function RecentActivity({

    activity,

}: Props) {

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Recent Exams

                </CardTitle>

            </CardHeader>

            <CardContent>

                {

                    activity.length === 0 ? (

                        <p className="text-sm text-muted-foreground">

                            No exams found.

                        </p>

                    ) : (

                        <div className="space-y-4">

                            {

                                activity.map(

                                    (exam: any) => (

                                        <div

                                            key={exam._id}

                                            className="flex items-center justify-between border-b pb-3"

                                        >

                                            <div>

                                                <p className="font-medium">

                                                    {exam.title ?? "Assessment"}

                                                </p>

                                                <p className="text-sm text-muted-foreground">

                                                    {exam.percentage ?? 0}% Score

                                                </p>

                                            </div>

                                            <span className="text-sm">

                                                {exam.status}

                                            </span>

                                        </div>

                                    )

                                )

                            }

                        </div>

                    )

                }

            </CardContent>

        </Card>

    );

}