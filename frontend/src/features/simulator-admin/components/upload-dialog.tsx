"use client";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCreateOfficialExam } from "../hooks/use-official-exams";

interface UploadDialogProps {
  onSuccess?: () => void;
}

export default function UploadDialog({
  onSuccess,
}: UploadDialogProps) {
  const [open, setOpen] = useState(false);

  const mutation =
    useCreateOfficialExam();

  const [title, setTitle] =
    useState("");

  const [examCode, setExamCode] =
    useState("");

  const [examType, setExamType] =
    useState("TOEFL");

  const [file, setFile] =
    useState<File | null>(null);

  async function handleUpload() {
    if (!file) return;

    await mutation.mutateAsync({
      examCode,
      title,
      examType,
      file,
    });

    setOpen(false);

    setTitle("");
    setExamCode("");
    setExamType("TOEFL");
    setFile(null);

    onSuccess?.();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Exam
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>

            Upload Official Exam

          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Exam Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <Input
            placeholder="Exam Code"
            value={examCode}
            onChange={(e) =>
              setExamCode(e.target.value)
            }
          />

          <select
            className="w-full rounded-md border p-2 bg-background"
            value={examType}
            onChange={(e) =>
              setExamType(
                e.target.value
              )
            }
          >
            <option value="TOEFL">
              TOEFL
            </option>

            <option value="IELTS">
              IELTS
            </option>

            <option value="GRE">
              GRE
            </option>

            <option value="SAT">
              SAT
            </option>

          </select>

          <Input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] ??
                  null
              )
            }
          />

        </div>

        <DialogFooter>

          <Button
            disabled={
              mutation.isPending ||
              !file
            }
            onClick={
              handleUpload
            }
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                Uploading...

              </>
            ) : (
              "Upload"
            )}
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  );
}