import { Button } from "@/components/ui/button";
import Link from "next/link";


type Props = {

    profile: {

        firstName: string;

        targetExam: string;

    };

};

export default function DashboardHero({

    profile,

}: Props) {

    return (

        <div className="rounded-3xl border bg-card p-8">

            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

                <div>

                    <h1 className="text-4xl font-bold">

                        Welcome back, {profile.firstName || "Student"} 👋

                    </h1>

                    <p className="mt-3 max-w-2xl text-muted-foreground">

                        Preparing for{" "}

                        <strong>

                            {profile.targetExam || "your exam"}

                        </strong>

                        {" "}using AI-powered assessments and official simulations.

                    </p>

                </div>

                <div className="flex gap-3">

                  <Button>

                        <Link href="/documents">

                            Upload Notes

                        </Link>

                    </Button>

                    <Button variant="outline">

                        <Link href="/documents">

                            Generate Assessment

                        </Link>

                    </Button>

                    <Button
                        variant="outline"
                        asChild
                    >

                        <Link href="/simulator">

                            Start Simulator

                        </Link>

                    </Button>

                </div>

            </div>

        </div>

    );

}