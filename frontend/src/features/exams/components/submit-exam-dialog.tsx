"use client";

import {
  Button,
} from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  answered: number;
  total: number;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function SubmitExamDialog({
  open,
  answered,
  total,
  loading,
  onCancel,
  onSubmit,
}: Props) {

  return (

    <Dialog
      open={open}
      onOpenChange={onCancel}
    >

      <DialogContent>

        <DialogHeader>

          <DialogTitle>

            Submit Exam?

          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <div className="rounded-lg border p-4">

            <div className="flex justify-between">

              <span>

                Answered

              </span>

              <span className="font-semibold">

                {answered}

              </span>

            </div>

            <div className="mt-2 flex justify-between">

              <span>

                Unanswered

              </span>

              <span className="font-semibold">

                {total - answered}

              </span>

            </div>

          </div>

          <p className="text-sm text-muted-foreground">

            Once submitted, your answers
            cannot be changed.

          </p>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={onCancel}
          >

            Cancel

          </Button>

          <Button
            disabled={loading}
            onClick={onSubmit}
          >

            {
              loading
                ? "Submitting..."
                : "Submit Exam"
            }

          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}