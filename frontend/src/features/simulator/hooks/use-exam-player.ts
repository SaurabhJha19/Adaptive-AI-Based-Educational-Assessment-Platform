"use client";

import {
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

    ] = useState<Record<string, string>>({});

    const [

        marked,

        setMarked,

    ] = useState<string[]>([]);

    const section =
        exam.sections?.[sectionIndex];

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

    const firstQuestionKey =
        questions.length
            ? (
                questions[0]._id ??
                questions[0].questionNumber
            )
            : null;

    const [

        visited,

        setVisited,

    ] = useState<Set<string>>(() =>

        firstQuestionKey

            ? new Set([firstQuestionKey])

            : new Set()

    );

    const [

        reviewMode,

        setReviewMode,

    ] = useState(false);

    const [

        transitionMode,

        setTransitionMode,

    ] = useState(false);

    const [

        breakMode,

        setBreakMode,

    ] = useState(false);

    const question =
        questions[questionIndex];

    const currentGroup =
        useMemo(() => {

            if (!question) {

                return null;

            }

            return groups.find(

                (group: any) =>

                    group.questions.some(

                        (q: any) =>

                            q.questionNumber ===
                            question.questionNumber

                    )

            );

        }, [

            groups,

            question,

        ]);

    const currentPassage =
        currentGroup?.content ?? [];

    const groupQuestions =
        currentGroup?.questions ?? [];

    const isLastSection =
        sectionIndex ===
        exam.sections.length - 1;

    const isLastQuestion =
        questionIndex ===
        questions.length - 1;

    const isLastQuestionOfExam =
        isLastSection &&
        isLastQuestion;

    function visitQuestion(
        key: string
    ) {

        setVisited(previous => {

            if (

                previous.has(key)

            ) {

                return previous;

            }

            const next =
                new Set(previous);

            next.add(key);

            return next;

        });

    }

    function answer(
        value: string
    ) {

        if (!question) {

            return;

        }

        const key =
            question._id ??
            question.questionNumber;

        setAnswers(previous => ({

            ...previous,

            [key]: value,

        }));

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

            isLastQuestion

        ) {

            openReview();

            return;

        }

        const nextQuestion =
            questions[
                questionIndex + 1
            ];

        if (nextQuestion) {

            visitQuestion(

                nextQuestion._id ??
                nextQuestion.questionNumber

            );

        }

        setQuestionIndex(

            previous =>

                previous + 1

        );

    }

    function previous() {

        if (

            questionIndex === 0

        ) {

            return;

        }

        const previousQuestion =
            questions[
                questionIndex - 1
            ];

        if (previousQuestion) {

            visitQuestion(

                previousQuestion._id ??
                previousQuestion.questionNumber

            );

        }

        setQuestionIndex(

            previous =>

                previous - 1

        );

    }

    function jump(
        index: number
    ) {

        const target =
            questions[index];

        if (target) {

            visitQuestion(

                target._id ??
                target.questionNumber

            );

        }

        setQuestionIndex(index);

    }

    function toggleReview() {

        if (!question) {

            return;

        }

        const key =
            question._id ??
            question.questionNumber;

        setMarked(previous =>

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

    function openReview() {

        setReviewMode(true);

    }

    function closeReview() {

        setReviewMode(false);

    }

    function submitReview() {

        closeReview();

        if (

            !isLastSection

        ) {

            setBreakMode(true);

        }

    }

    function closeBreak() {

        setBreakMode(false);

        setTransitionMode(true);

    }

    function closeTransition() {

        setTransitionMode(false);

        if (

            isLastSection

        ) {

            return;

        }

        setSectionIndex(

            previous =>

                previous + 1

        );

        setQuestionIndex(0);

    }

    return {

        section,

        sectionIndex,

        currentGroup,

        currentPassage,

        groupQuestions,

        question,

        questions,

        questionIndex,

        answers,

        marked,

        visited,

        reviewMode,

        transitionMode,

        breakMode,

        isLastQuestion,

        isLastSection,

        isLastQuestionOfExam,

        answer,

        next,

        previous,

        jump,

        toggleReview,

        openReview,

        closeReview,

        submitReview,

        closeBreak,

        closeTransition,

    };

}