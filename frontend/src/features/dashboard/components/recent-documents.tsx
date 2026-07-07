import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Props = {

    documents: any[];

};

export default function RecentDocuments({

    documents,

}: Props) {

    return (

       <Card className="rounded-2xl border shadow-sm">

            <CardHeader>

                <CardTitle>

                    Recent Documents

                </CardTitle>

            </CardHeader>

            <CardContent className="p-6">

                {

                    documents.length === 0 ? (

                        <p className="text-sm text-muted-foreground">

                            No uploaded documents.

                        </p>

                    ) : (

                        <div className="space-y-4">

                            {

                                documents.map(

                                    (doc: any) => (

                                        <div

                                            key={doc._id}

                                            className="border-b pb-3"

                                        >

                                            <h4 className="font-medium">

                                                {doc.originalName}

                                            </h4>

                                            <p className="text-sm text-muted-foreground">

                                                {doc.status}

                                            </p>

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