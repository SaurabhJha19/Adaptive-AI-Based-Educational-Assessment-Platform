"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Button,
} from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";


type Props = {

  documentId: string;

  documentName: string;

  children:
    React.ReactNode;

};

export default function GenerateExamDialog({

  documentId,

  documentName,

  children,

}: Props) {

  const router =
    useRouter();


  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    title,
    setTitle,
  ] = useState(
    `${documentName} Practice Test`
  );

  const [
    questionCount,
    setQuestionCount,
  ] = useState(10);

  const [
    difficulty,
    setDifficulty,
  ] = useState<
    "adaptive"
    | "easy"
    | "medium"
    | "hard"
  >(
    "adaptive"
  );

const generate = () => {

  const params =
    new URLSearchParams({

      documentId,

      title,

      questionCount:
        questionCount.toString(),

      difficulty,

    });

  setOpen(false);

  router.push(
    `/exams/generating?${params.toString()}`
  );

};

  return (

    <Dialog
      open={open}
      onOpenChange={
        setOpen
      }
    >

      <DialogTrigger
        asChild
      >
        {children}
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>

            Generate AI Exam

          </DialogTitle>

        </DialogHeader>

        <div className="space-y-6">

          <div>

            <Label>
              Exam Title
            </Label>

            <Input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <Label>

              Questions

            </Label>

            <RadioGroup

              value={
                String(
                  questionCount
                )
              }

              onValueChange={
                value =>
                  setQuestionCount(
                    Number(value)
                  )
              }

            >

              <div className="flex gap-4">

                {[5,10,20].map(
                  count => (

                    <div
                      key={count}
                      className="flex items-center gap-2"
                    >

                      <RadioGroupItem
                        value={String(count)}
                        id={String(count)}
                      />

                      <Label
                        htmlFor={String(count)}
                      >
                        {count}
                      </Label>

                    </div>

                  )
                )}

              </div>

            </RadioGroup>

          </div>

          <div>

            <Label>

              Difficulty

            </Label>

            <RadioGroup

              value={difficulty}

              onValueChange={
                value =>
                  setDifficulty(
                    value as any
                  )
              }

            >

              {[
                "adaptive",
                "easy",
                "medium",
                "hard",
              ].map(level => (

                <div
                  key={level}
                  className="flex items-center gap-2"
                >

                  <RadioGroupItem
                    value={level}
                    id={level}
                  />

                  <Label
                    htmlFor={level}
                  >
                    {level}
                  </Label>

                </div>

              ))}

            </RadioGroup>

          </div>

          <Button

            className="w-full"

            disabled={
             title.trim() === ""
            }

            onClick={
              generate
            }

          >

            Generate Exam

          </Button>

        </div>

      </DialogContent>

    </Dialog>

  );

}