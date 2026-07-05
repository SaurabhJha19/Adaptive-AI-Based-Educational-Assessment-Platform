"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { saveAnswer } from "../services/attempt.service";


export default function useExamPlayer(exam: any, attemptId: string) {

    const [sectionIndex, setSectionIndex] = useState(0);

    const [questionIndex, setQuestionIndex] = useState(0);

    const [answers, setAnswers] =
        useState<Record<string, string>>({});


    const [marked, setMarked] =
        useState<string[]>([]);

    const section =
        exam.sections[sectionIndex];

    const questions = useMemo(() => {

        if (!section) return [];

        return section.questionGroups.flatMap(
            (group: any) => group.questions
        );

    }, [section]);

    const question =
        questions[questionIndex];

        useEffect(() => {

            const key =
                question?._id ??
                question?.questionNumber;

            if (!key) return;

            const value = answers[key];

            if (!value) return;

            saveAnswer(
                attemptId,
                key,
                value
            );

        }, [
            answers,
            question,
            attemptId,
        ]);

    function answer(option: string) {

        const key =
            question._id ??
            question.questionNumber;

        setAnswers((prev) => ({
            ...prev,
            [key]: option,
        }));

    }

    function next() {

        if (
            questionIndex <
            questions.length - 1
        ) {

            setQuestionIndex((p) => p + 1);

            return;

        }

        if (
            sectionIndex <
            exam.sections.length - 1
        ) {

            setSectionIndex((p) => p + 1);

            setQuestionIndex(0);

        }

    }

    function previous() {

        if (questionIndex > 0) {

            setQuestionIndex((p) => p - 1);

            return;

        }

        if (sectionIndex > 0) {

            const previousSection =
                exam.sections[sectionIndex - 1];

            const previousQuestions =
                previousSection.questionGroups.flatMap(
                    (g: any) => g.questions
                );

            setSectionIndex((p) => p - 1);

            setQuestionIndex(
                previousQuestions.length - 1
            );

        }

    }

    function jump(index: number) {

        setQuestionIndex(index);

    }

    function toggleReview() {

        const key =
            question._id ??
            question.questionNumber;

        setMarked((prev) =>

            prev.includes(key)
                ? prev.filter((id) => id !== key)
                : [...prev, key]

        );

    }

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

    };

}