"use client";

import { useState } from "react";

import {
    Loader2,
    Upload,
} from "lucide-react";

import {

    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog";

import {
    Button,
} from "@/components/ui/button";

import {
    Input,
} from "@/components/ui/input";

import {
    useCreateOfficialExam,
} from "../hooks/use-official-exams";

interface UploadDialogProps {

    onSuccess?: () => void;

}

export default function UploadDialog({

    onSuccess,

}: UploadDialogProps) {

    const mutation =
        useCreateOfficialExam();

    const [

        open,

        setOpen,

    ] = useState(false);

    const [

        title,

        setTitle,

    ] = useState("");

    const [

        examCode,

        setExamCode,

    ] = useState("");

    const [

        examType,

        setExamType,

    ] = useState("SAT");

    const [

        duration,

        setDuration,

    ] = useState(180);

    const [

        questionPdf,

        setQuestionPdf,

    ] = useState<File | null>(null);

    const [

        answerPdf,

        setAnswerPdf,

    ] = useState<File | null>(null);

    async function handleUpload() {

        if (!questionPdf) {

            alert(
                "Question PDF is required."
            );

            return;

        }

        await mutation.mutateAsync({

            title,

            examCode,

            examType,

            duration,

            questionPdf,

            answerPdf:
                answerPdf ?? undefined,

        });

        setTitle("");

        setExamCode("");

        setExamType("SAT");

        setDuration(180);

        setQuestionPdf(null);

        setAnswerPdf(null);

        setOpen(false);

        onSuccess?.();

    }

    return (

        <Dialog
            open={open}
            onOpenChange={setOpen}
        >

            <DialogTrigger asChild>

                <Button>

                    <Upload className="mr-2 h-4 w-4"/>

                    Upload Official Exam

                </Button>

            </DialogTrigger>

            <DialogContent className="max-w-xl">

                <DialogHeader>

                    <DialogTitle>

                        Upload Official Exam

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-4">

                    <Input
                        placeholder="Display Name"
                        value={title}
                        onChange={(e)=>
                            setTitle(
                                e.target.value
                            )
                        }
                    />

                    <Input
                        placeholder="Paper Code"
                        value={examCode}
                        onChange={(e)=>
                            setExamCode(
                                e.target.value
                            )
                        }
                    />

                    <select
                        className="w-full rounded-md border bg-background p-2"
                        value={examType}
                        onChange={(e)=>
                            setExamType(
                                e.target.value
                            )
                        }
                    >

                        <option>SAT</option>

                        <option>TOEFL</option>

                        <option>GRE</option>

                        <option>GMAT</option>

                        <option>IELTS</option>

                        <option>ACT</option>

                    </select>

                    <Input
                        type="number"
                        placeholder="Duration"
                        value={duration}
                        onChange={(e)=>
                            setDuration(
                                Number(
                                    e.target.value
                                )
                            )
                        }
                    />

                    <div>

                        <p className="mb-2 text-sm font-medium">

                            Question PDF

                        </p>

                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e)=>
                                setQuestionPdf(
                                    e.target.files?.[0] ??
                                    null
                                )
                            }
                        />

                    </div>

                    <div>

                        <p className="mb-2 text-sm font-medium">

                            Answer Key PDF (Optional)

                        </p>

                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e)=>
                                setAnswerPdf(
                                    e.target.files?.[0] ??
                                    null
                                )
                            }
                        />

                    </div>

                </div>

                <DialogFooter>

                    <Button
                        disabled={
                            mutation.isPending
                        }
                        onClick={
                            handleUpload
                        }
                    >

                        {

                            mutation.isPending

                            ?

                            <>

                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>

                                Uploading...

                            </>

                            :

                            "Upload"

                        }

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}