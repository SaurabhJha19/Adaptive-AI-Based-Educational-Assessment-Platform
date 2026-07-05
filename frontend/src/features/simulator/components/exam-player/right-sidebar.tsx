interface Props {
    currentQuestion: number;
    totalQuestions: number;
    answered: number;
    marked: number;
}

export default function RightSidebar({
    currentQuestion,
    totalQuestions,
    answered,
    marked,
}: Props) {

    const unanswered =
        totalQuestions - answered;

    const progress =
        (answered / totalQuestions) * 100;

    return (

        <aside className="w-80 border-l bg-card flex flex-col">

            <div className="border-b p-6">

                <h2 className="text-xl font-semibold">

                    Progress

                </h2>

                <p className="mt-1 text-sm text-muted-foreground">

                    Your current exam status

                </p>

            </div>

            <div className="space-y-6 p-6">

                <div>

                    <div className="mb-2 flex justify-between text-sm">

                        <span>

                            Completion

                        </span>

                        <span>

                            {Math.round(progress)}%

                        </span>

                    </div>

                    <div className="h-2 rounded-full bg-muted">

                        <div
                            className="h-2 rounded-full bg-primary transition-all duration-300"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                </div>

                <div className="space-y-4">

                    <StatCard
                        title="Current Question"
                        value={`${currentQuestion} / ${totalQuestions}`}
                    />

                    <StatCard
                        title="Answered"
                        value={answered}
                    />

                    <StatCard
                        title="Marked"
                        value={marked}
                    />

                    <StatCard
                        title="Remaining"
                        value={unanswered}
                    />

                </div>

            </div>

        </aside>

    );

}

interface StatCardProps {
    title: string;
    value: string | number;
}

function StatCard({
    title,
    value,
}: StatCardProps) {

    return (

        <div className="rounded-xl border bg-background p-4">

            <div className="text-sm text-muted-foreground">

                {title}

            </div>

            <div className="mt-2 text-2xl font-bold">

                {value}

            </div>

        </div>

    );

}