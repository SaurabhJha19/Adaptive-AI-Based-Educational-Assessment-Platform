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

    const [

    reviewMode,

    setReviewMode,

] = useState(false);

    const section =
        exam.sections?.[
            sectionIndex
        ];

const groups =
    useMemo(() => {

        if (!section) {

            return [];

        }

        return section.questionGroups ?? [];

    }, [section]);

const questions =
    useMemo(() => {

        return groups.flatMap(

            (group: any) =>

                group.questions

        );

    }, [groups]);


const [

    visited,

    setVisited,

] = useState<Set<string>>(
    new Set()
);


const question =
    questions[
        questionIndex
    ];

const currentGroup =
    useMemo(() => {

        return groups.find(

            (group: any) =>

                group.questions.some(

                    (q: any) =>

                        q.questionNumber ===

                        question?.questionNumber

                )

        );

    }, [

        groups,

        question,

    ]);

const currentPassage =

    currentGroup?.passage ??

    "";

const groupQuestions =

    currentGroup?.questions ??

    [];

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

useEffect(() => {

    if (!question) {

        return;

    }

    const key =

        question._id ??

        question.questionNumber;

    setVisited(previous => {

        const next =

            new Set(previous);

        next.add(key);

        return next;

    });

}, [question]);

 const isLastSection =
    sectionIndex ===
    exam.sections.length - 1;

const isLastQuestion =
    questionIndex ===
    questions.length - 1;

const isLastQuestionOfExam =
    isLastSection &&
    isLastQuestion;


function openReview() {

    setReviewMode(true);

}

function closeReview() {

    setReviewMode(false);

}

return {

   section,

    currentGroup,

    currentPassage,

    groupQuestions,

    question,

    questions,
    
    sectionIndex,

    visited,

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

    reviewMode,

    openReview,

    closeReview,

};

}