import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function QuickActions() {

    return (

        <div className="flex flex-wrap gap-4">

            <Button asChild>

                <Link href="/documents">

                    Upload Notes

                </Link>

            </Button>

            <Button
                variant="outline"
                asChild
            >

                <Link href="/documents">

                    Generate Assessment

                </Link>

            </Button>

            <Button
                variant="outline"
                asChild
            >

                <Link href="/simulator">

                    Official Simulator

                </Link>

            </Button>

            <Button
                variant="outline"
                asChild
            >

                <Link href="/results">

                    View Results

                </Link>

            </Button>

        </div>

    );

}