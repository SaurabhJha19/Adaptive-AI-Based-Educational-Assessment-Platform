"use client";

import SplitPane from "../layout/split-pane";
import QuestionView from "./question-view";
import QuestionNavigation from "./question-navigation";
import QuestionPalette from "./question-palette";

import { ReviewScreen } from "../review";

import {
    SimulatorLayout,
    SimulatorWorkspace,
    SimulatorHeader,
    PassagePanel,
    QuestionPanel,
    BottomToolbar,
} from "../layout";

import {
    SectionTransition,
} from "../../components/transition";

interface Props {

    exam: any;

    player: any;

    remainingTime: number;

    submitExam?: () => Promise<void>;

    isSubmitting?: boolean;

}

export default function ExamPlayer({

    exam,

    player,

    remainingTime,

    submitExam,

    isSubmitting,

}: Props) {

    const {

        section,

        currentGroup,

        currentPassage,

        visited,

        question,

        questions,

        questionIndex,

        reviewMode,

        openReview,

        closeReview,

        answers,

        answer,

        marked,

        next,

        previous,

        jump,

        toggleReview,

        transitionMode,

        submitReview,

        closeTransition,

        sectionIndex,

        isLastQuestion,

    } = player;

    if (

        !section ||

        !question

    ) {

        return (

            <div className="flex h-screen items-center justify-center">

                No questions available.

            </div>

        );

    }

    const unansweredCount =

        questions.filter(

            (q: any) => {

                const key =

                    q._id ??

                    q.questionNumber;

                return !answers[key];

            }

        ).length;

    if (reviewMode) {

        return (

            <ReviewScreen

                exam={exam}

                section={section}

                questions={questions}

                currentQuestion={

                    question.questionNumber

                }

                answers={answers}

                marked={marked}

                visited={visited}

                onJump={jump}

                onBack={closeReview}

                onContinue={submitReview}

            />

        );

    }

    if (transitionMode) {

        return (

            <SectionTransition

                sectionIndex={

                    sectionIndex

                }

                totalSections={

                    exam.sections.length

                }

                onContinue={

                    closeTransition

                }

            />

        );

    }

    return (

        <SimulatorLayout

            header={

                <SimulatorHeader

                    exam={exam}

                    section={section}

                    question={question}

                    currentQuestion={

                        question.questionNumber

                    }

                    totalQuestions={

                        questions.length

                    }

                    remainingTime={

                        remainingTime

                    }

                />

            }

            workspace={

                <SimulatorWorkspace

                    content={

                        <SplitPane

                            defaultWidth={45}

                            left={

                                <PassagePanel

                                    group={

                                        currentGroup

                                    }

                                />

                            }

                            right={

                                <QuestionPanel>

                                    <QuestionView

                                        question={

                                            question

                                        }

                                        answer={

                                            answers[

                                                question._id ??

                                                question.questionNumber

                                            ]

                                        }

                                        onAnswer={

                                            answer

                                        }

                                    />

                                </QuestionPanel>

                            }

                        />

                    }

                    sidebar={

                        <QuestionPalette

                            questions={

                                questions

                            }

                            currentQuestion={

                                question.questionNumber

                            }

                            answers={

                                answers

                            }

                            marked={

                                marked

                            }

                            visited={

                                visited

                            }

                            onSelectQuestion={

                                jump

                            }

                        />

                    }

                />

            }

            footer={

                <BottomToolbar

                    left={

                        <QuestionNavigation

                            onPrevious={

                                previous

                            }

                            onNext={

                                next

                            }

                            onMarkReview={

                                toggleReview

                            }

                            onReviewScreen={

                                openReview

                            }

                            onSubmit={

                                submitExam

                            }

                            reviewed={

                                marked.includes(

                                    question._id ??

                                    question.questionNumber

                                )

                            }

                            unansweredCount={

                                unansweredCount

                            }

                            isSubmitting={

                                isSubmitting

                            }

                            isLastQuestion={

                                isLastQuestion

                            }

                        />

                    }

                    right={

                        <QuestionPalette

                            questions={

                                questions

                            }

                            currentQuestion={

                                question.questionNumber

                            }

                            answers={

                                answers

                            }

                            marked={

                                marked

                            }

                            visited={

                                visited

                            }

                            onSelectQuestion={

                                jump

                            }

                        />

                    }

                />

            }

        />

    );

}