"use client";

import { Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { usePublishOfficialExam } from "../hooks/use-official-exams";

interface Props {
    examId: string;
}

export default function PublishDialog({
    examId,
}: Props) {

    const mutation =
        usePublishOfficialExam();

    return (

        <AlertDialog>

            <AlertDialogTrigger asChild>

                <Button
                    size="icon"
                >
                    <Rocket className="h-4 w-4"/>
                </Button>

            </AlertDialogTrigger>

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>

                        Publish Exam?

                    </AlertDialogTitle>

                    <AlertDialogDescription>

                        This exam will become visible to students.

                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>

                        Cancel

                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() =>
                            mutation.mutate(examId)
                        }
                    >
                        Publish
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

    );

}