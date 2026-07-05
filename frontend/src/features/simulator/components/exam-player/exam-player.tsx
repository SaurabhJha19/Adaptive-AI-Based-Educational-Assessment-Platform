"use client";

import ExamHeader from "./exam-header";
import QuestionNavigation from "./question-navigation";
import QuestionPalette from "./question-palette";
import QuestionView from "./question-view";

import useExamPlayer from "../../hooks/use-exam-player";

interface Props {
  exam: any;
  attemptId: string;
}

export default function ExamPlayer({
  exam,
  attemptId,
}: Props) {

  const {

    section,

    question,

    questions,

    questionIndex,

    answers,

    answer,

    marked,

    next,

    previous,

    jump,

    toggleReview,

  } = useExamPlayer(exam, attemptId);

  if (!section || !question) {

    return (
      <div className="flex h-screen items-center justify-center">
        No questions available.
      </div>
    );

  }

  return (

    <div className="flex h-screen bg-gray-100">

      <div className="flex flex-1 flex-col">

        <ExamHeader
          exam={exam}
          section={section}
          currentQuestion={questionIndex + 1}
          totalQuestions={questions.length}
        />

        <div className="h-2 bg-gray-200">

          <div
            className="h-full bg-black transition-all duration-300"
            style={{
              width: `${
                ((questionIndex + 1) /
                  questions.length) *
                100
              }%`,
            }}
          />

        </div>

        <div className="flex-1 overflow-auto p-8">

          <QuestionView
            question={question}
            answer={
              answers[
                question._id ??
                  question.questionNumber
              ]
            }
            onAnswer={answer}
          />

        </div>

        <QuestionNavigation
            onPrevious={previous}
            onNext={next}
            onReview={toggleReview}
            reviewed={
                marked.includes(
                    question._id ??
                    question.questionNumber
                )
            }
        />

      </div>

        <QuestionPalette
            questions={questions}
            currentQuestion={
                question.questionNumber
            }
            answers={answers}
            marked={marked}
            onSelectQuestion={jump}
        />

    </div>

  );

}