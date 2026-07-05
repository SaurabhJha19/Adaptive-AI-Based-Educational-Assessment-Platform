"use client";

import ExamHeader from "../components/exam-player/exam-header";
import LeftSidebar from "../components/exam-player/left-sidebar";
import MainContent from "../components/exam-player/main-content";
import RightSidebar from "../components/exam-player/right-sidebar";
import BottomNavigation from "../components/exam-player/bottom-navigation";

import useExamPlayer from "../hooks/use-exam-player";

interface Props {
    exam: any;
    attempt: any;
}

export default function SimulatorPlayer({
    exam,
    attempt,
}: Props) {

    const {

        section,

        question,

        questions,

        questionIndex,

        answers,

        marked,

        answer,

        next,

        previous,

        jump,

        toggleReview,

    } = useExamPlayer(
        exam,
        attempt._id
    );

    if (!section || !question) {

        return (

            <div className="flex h-screen items-center justify-center">

                No questions available.

            </div>

        );

    }

    return (

        <div className="flex h-screen flex-col bg-background">

            <ExamHeader
                exam={exam}
                section={section}
                currentQuestion={questionIndex + 1}
                totalQuestions={questions.length}
            />

            <div className="flex flex-1 overflow-hidden">

                <LeftSidebar
                    questions={questions}
                    currentQuestion={question.questionNumber}
                    answers={answers}
                    marked={marked}
                    onSelectQuestion={jump}
                />

                <MainContent
                    question={question}
                    answer={
                        answers[
                            question._id ??
                            question.questionNumber
                        ]
                    }
                    onAnswer={answer}
                />

                <RightSidebar
                    currentQuestion={questionIndex + 1}
                    totalQuestions={questions.length}
                    answered={
                        questions.filter((question: any) => {

                            const key =
                                question._id ??
                                question.questionNumber;

                            return !!answers[key];

                        }).length
                    }
                    marked={
                        marked.length
                    }
                />

            </div>

            <BottomNavigation
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

    );

}