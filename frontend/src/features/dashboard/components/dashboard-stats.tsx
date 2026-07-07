import {
    BookOpen,
    ClipboardList,
    Trophy,
    Clock,
    Brain,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

type Props = {

    stats: {

        documentCount: number;

        examCount: number;

        averageScore: number;

        studyHours: number;

        questionsSolved: number;

    };

};

const cards = [

    {
        key: "documentCount",
        title: "Documents",
        icon: BookOpen,
    },

    {
        key: "examCount",
        title: "Assessments",
        icon: ClipboardList,
    },

    {
        key: "averageScore",
        title: "Average Score",
        icon: Trophy,
        suffix: "%",
    },

    {
        key: "studyHours",
        title: "Study Hours",
        icon: Clock,
    },

    {
        key: "questionsSolved",
        title: "Questions Solved",
        icon: Brain,
    },

];

export default function DashboardStats({

    stats,

}: Props) {

    return (

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">

            {

                cards.map(

                    card => {

                        const Icon = card.icon;

                        return (

                            <Card key={card.key}>

                                <CardContent className="flex items-center justify-between p-6">

                                    <div>

                                        <p className="text-sm text-muted-foreground">

                                            {card.title}

                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold">

                                            {

                                                (stats as any)[card.key]

                                            }

                                            {

                                                card.suffix ?? ""

                                            }

                                        </h2>

                                    </div>

                                    <Icon className="h-8 w-8 text-primary" />

                                </CardContent>

                            </Card>

                        );

                    }

                )

            }

        </div>

    );

}