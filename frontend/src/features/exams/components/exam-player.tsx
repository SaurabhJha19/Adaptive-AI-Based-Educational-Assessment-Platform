"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Exam } from "../types";
import { useSubmitExam } from "../use-submit-exam";

import ExamTimer from "./exam-timer";
import QuestionCard from "./question-card";
import QuestionNavigation from "./question-navigation";
import QuestionProgress from "./question-progress";
import SubmitExamDialog from "./submit-exam-dialog";

type Props = {
  exam: Exam;
  sourceType?: "generated" | "simulator";
  attemptId?: string;
};

export default function ExamPlayer({
  exam,
  sourceType = "generated",
  attemptId,
}: Props) {

  const router =
    useRouter();

  const submitMutation =
    useSubmitExam();

  const [
    current,
    setCurrent,
  ] = useState(0);

  const [
    answers,
    setAnswers,
  ] = useState<
    Record<string, string>
  >({});

  const [
    showSubmitDialog,
    setShowSubmitDialog,
  ] = useState(false);

  const question =
    exam.questions[current];

  const answeredCount =
    useMemo(
      () =>
        Object.keys(
          answers
        ).length,
      [answers]
    );

  useEffect(() => {

    const listener =
      (
        e: KeyboardEvent
      ) => {

        if (
          e.key === "ArrowRight"
        ) {

          setCurrent(
            value =>
              Math.min(
                value + 1,
                exam.questions.length - 1
              )
          );

        }

        if (
          e.key === "ArrowLeft"
        ) {

          setCurrent(
            value =>
              Math.max(
                value - 1,
                0
              )
          );

        }

      };

    window.addEventListener(
      "keydown",
      listener
    );

    return () =>
      window.removeEventListener(
        "keydown",
        listener
      );

  }, [exam.questions.length]);

const handleSubmit = async () => {
  try {
    const payload = Object.entries(answers).map(
      ([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      })
    );

    await submitMutation.mutateAsync({
      examId: exam._id,
      sourceType,
      sourceId:
        sourceType === "simulator"
          ? exam._id
          : undefined,
      attemptId,
      answers: payload,
    });

    router.push(
      `/results/exam/${exam._id}`
    );
  } catch (err) {
    console.error(err);
  }
};

  return (

    <div className="mx-auto max-w-5xl space-y-8 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            {exam.title}

          </h1>

          <p className="text-muted-foreground">

            AI Generated Assessment

          </p>

        </div>

        <ExamTimer

          totalMinutes={
            exam.questions.length * 2
          }

          onTimeout={() =>
            setShowSubmitDialog(
              true
            )
          }

        />

      </div>

      {/* Progress */}

      <QuestionProgress

        current={current}

        total={
          exam.questions.length
        }

      />

      {/* Question */}

      <QuestionCard

        question={question}

        selectedAnswer={
          answers[
            question._id
          ]
        }

        onAnswer={answer =>

          setAnswers(
            previous => ({

              ...previous,

              [question._id]:
                answer,

            })
          )

        }

      />

      {/* Previous / Next */}

      <div className="flex justify-between">

        <Button

          variant="outline"

          disabled={
            current === 0
          }

          onClick={() =>
            setCurrent(
              value =>
                Math.max(
                  value - 1,
                  0
                )
            )
          }

        >

          Previous

        </Button>

        <Button

          onClick={() => {

            if (
              current <
              exam.questions.length - 1
            ) {

              setCurrent(
                value =>
                  Math.min(
                    value + 1,
                    exam.questions.length - 1
                  )
              );

            } else {

              setShowSubmitDialog(
                true
              );

            }

          }}

        >

          {

            current ===
            exam.questions.length - 1

              ? "Submit Exam"

              : "Next"

          }

        </Button>

      </div>

      {/* Question Navigator */}

      <QuestionNavigation

        total={
          exam.questions.length
        }

        current={
          current
        }

        answers={
          answers
        }

        questionIds={
          exam.questions.map(
            question =>
              question._id
          )
        }

        onSelect={
          setCurrent
        }

      />

      {/* Submit Dialog */}

      <SubmitExamDialog

        open={
          showSubmitDialog
        }

        answered={
          answeredCount
        }

        total={
          exam.questions.length
        }

        loading={
          submitMutation.isPending
        }

        onCancel={() =>
          setShowSubmitDialog(
            false
          )
        }

        onSubmit={
          handleSubmit
        }

      />

    </div>

  );

}