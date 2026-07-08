"use client";

import Link from "next/link";

import {
    Eye,
    Trash2,
    Rocket,
    Archive,
    Play,
    Loader2,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {

    useParseOfficialExam,

    usePublishOfficialExam,

    useArchiveOfficialExam,

    useDeleteOfficialExam,

} from "../hooks/use-official-exams";

interface Props {
  examId: string;
  status: string;
}

export default function ExamActions({
  examId,
  status,
}: Props) {
  const publishMutation = usePublishOfficialExam();
  const parseMutation = useParseOfficialExam();
  const archiveMutation = useArchiveOfficialExam();
  const deleteMutation = useDeleteOfficialExam();

  const publish = () => {
    publishMutation.mutate(examId);
  };

const parse = () => {

    parseMutation.mutate(
        examId
    );

};

  const archive = () => {
    archiveMutation.mutate(examId);
  };

  const remove = () => {
    if (!confirm("Delete this exam?")) return;

    deleteMutation.mutate(examId);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
    asChild
    size="sm"
    variant="outline"
>

    <Link
        href={`/simulator-admin/${examId}`}
    >

        <Eye className="h-4 w-4"/>

    </Link>

</Button>

{

status === "UPLOADED" && (

<Button

    size="sm"

    onClick={parse}

    disabled={
        parseMutation.isPending
    }

>

{

parseMutation.isPending

?

<Loader2 className="h-4 w-4 animate-spin"/>

:

<Play className="h-4 w-4"/>

}

</Button>

)

}

{

status === "REVIEW" && (

<Button

    size="sm"

    onClick={publish}

    disabled={
        publishMutation.isPending
    }

>

<Rocket className="h-4 w-4"/>

</Button>

)

}

{

status === "PUBLISHED" && (

<Button

    size="sm"

    variant="secondary"

    onClick={archive}

>

<Archive className="h-4 w-4"/>

</Button>

)

}

<Button

    size="sm"

    variant="destructive"

    onClick={remove}

>

<Trash2 className="h-4 w-4"/>

</Button>
    </div>
  );
}