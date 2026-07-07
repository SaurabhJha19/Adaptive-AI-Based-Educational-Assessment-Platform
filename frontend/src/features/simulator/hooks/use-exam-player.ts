"use client";

import {

    useEffect,
    useMemo,
    useState,

} from "react";

import { useSaveAnswer } from "./use-save-answer";

export default function useExamPlayer(

    exam: any,

    attemptId: string

) {

    const saveAnswer =
        useSaveAnswer();

    const [

        sectionIndex,

        setSectionIndex,

    ] = useState(0);

    const [

        questionIndex,

        setQuestionIndex,

    ] = useState(0);

    const [

        answers,

        setAnswers,

    ] = useState<
        Record<string, string>
    >({});

    const [

        marked,

        setMarked,

    ] = useState<string[]>([]);

    const section =
        exam.sections?.[
            sectionIndex
        ];

    const questions =
        useMemo(() => {

            if (!section) {

                return [];

            }

            return section.questionGroups.flatMap(

                (group: any) =>

                    group.questions

            );

        }, [section]);

    const question =
        questions[
            questionIndex
        ];

    function answer(
        value: string
    ) {

        if (!question) {

            return;

        }

        const key =
            question._id ??
            question.questionNumber;

        setAnswers(

            previous => ({

                ...previous,

                [key]: value,

            })

        );

        if (question._id) {

            saveAnswer.mutate({

                attemptId,

                questionId:
                    question._id,

                selectedAnswer:
                    value,

            });

        }

    }

    function next() {

        if (

            questionIndex <
            questions.length - 1

        ) {

            setQuestionIndex(

                previous =>

                    previous + 1

            );

            return;

        }

        if (

            sectionIndex <
            exam.sections.length - 1

        ) {

            setSectionIndex(

                previous =>

                    previous + 1

            );

            setQuestionIndex(0);

        }

    }

    function previous() {

        if (

            questionIndex > 0

        ) {

            setQuestionIndex(

                previous =>

                    previous - 1

            );

            return;

        }

        if (

            sectionIndex > 0

        ) {

            const previousSection =
                exam.sections[
                    sectionIndex - 1
                ];

            const previousQuestions =
                previousSection.questionGroups.flatMap(

                    (group: any) =>

                        group.questions

                );

            setSectionIndex(

                previous =>

                    previous - 1

            );

            setQuestionIndex(

                previousQuestions.length - 1

            );

        }

    }

    function jump(
        index: number
    ) {

        setQuestionIndex(
            index
        );

    }

    function toggleReview() {

        if (!question) {

            return;

        }

        const key =
            question._id ??
            question.questionNumber;

        setMarked(

            previous =>

                previous.includes(key)

                    ? previous.filter(

                        id =>

                            id !== key

                    )

                    : [

                        ...previous,

                        key,

                    ]

        );

    }

    useEffect(() => {

        return () => {

            saveAnswer.reset();

        };

    }, []);

 const isLastSection =
    sectionIndex ===
    exam.sections.length - 1;

const isLastQuestion =
    questionIndex ===
    questions.length - 1;

const isLastQuestionOfExam =
    isLastSection &&
    isLastQuestion;

return {

    section,

    question,

    questions,

    sectionIndex,

    questionIndex,

    answers,

    marked,

    answer,

    next,

    previous,

    jump,

    toggleReview,

    isLastQuestionOfExam,

    isLastSection,

    isLastQuestion,

};

}