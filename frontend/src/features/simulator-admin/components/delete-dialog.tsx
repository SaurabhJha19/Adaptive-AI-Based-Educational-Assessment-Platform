"use client";

import { Trash2 } from "lucide-react";

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

import { useDeleteOfficialExam } from "../hooks/use-official-exams";

interface Props {
    examId:string;
}

export default function DeleteDialog({
    examId,
}:Props){

    const mutation=
        useDeleteOfficialExam();

    return(

        <AlertDialog>

            <AlertDialogTrigger asChild>

                <Button
                    size="icon"
                    variant="destructive"
                >
                    <Trash2 className="h-4 w-4"/>
                </Button>

            </AlertDialogTrigger>

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>

                        Delete Exam?

                    </AlertDialogTitle>

                    <AlertDialogDescription>

                        This action cannot be undone.

                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>

                        Cancel

                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={()=>
                            mutation.mutate(examId)
                        }
                    >
                        Delete
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

    );

}