"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Brain,
  BookOpen,
  FileText,
  Sparkles,
} from "lucide-react";

const steps = [

  {
    icon: FileText,
    title: "Reading your document",
  },

  {
    icon: BookOpen,
    title: "Retrieving relevant knowledge",
  },

  {
    icon: Brain,
    title: "Generating AI questions",
  },

  {
    icon: Sparkles,
    title: "Building your exam",
  },

];

export default function ExamLoading() {

  const [
    current,
    setCurrent,
  ] = useState(0);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrent(
          value =>
            Math.min(
              value + 1,
              steps.length - 1
            )
        );

      }, 2000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  return (

    <div className="flex min-h-screen items-center justify-center">

      <div className="w-full max-w-lg rounded-xl border p-8">

        <h1 className="text-3xl font-bold">

          Generating Your AI Exam

        </h1>

        <p className="mt-2 mb-8 text-muted-foreground">

          Please wait while the AI prepares your personalized exam.

        </p>

        <div className="space-y-5">

          {steps.map(
            (
              step,
              index
            ) => {

              const Icon =
                step.icon;

              return (

                <div
                  key={step.title}
                  className={`flex items-center gap-4 transition ${
                    index <= current
                      ? "opacity-100"
                      : "opacity-40"
                  }`}
                >

                  <div className="rounded-full border p-3">

                    <Icon className="h-5 w-5" />

                  </div>

                  <span>

                    {step.title}

                  </span>

                </div>

              );

            }
          )}

        </div>

      </div>

    </div>

  );

}