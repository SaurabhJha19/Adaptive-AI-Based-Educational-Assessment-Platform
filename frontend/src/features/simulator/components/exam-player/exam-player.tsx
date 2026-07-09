"use client";

import QuestionView from "./question-view";
import QuestionNavigation from "./question-navigation";
import QuestionPalette from "./question-palette";
import {

    ReviewScreen,

} from "../review";
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
import useExamPlayer
from "../../hooks/use-exam-player";

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

        currentGroup,

        currentPassage,

        groupQuestions,

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

    } = useExamPlayer(

        exam,

        attemptId

    );

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

    questions.filter(question => {

        const key =

            question._id ??

            question.questionNumber;

        return !answers[key];

    }).length;

const passage =

    currentPassage;



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

            onJump={jump}

            onBack={closeReview}

            onSubmit={() => {submitReview}}

        />

    );

}

if (transitionMode) {

    return (

        <SectionTransition

            current={

                sectionIndex + 1

            }

            total={

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

                    currentQuestion={

                        questionIndex + 1

                    }

                    totalQuestions={

                        questions.length

                    }

                />

            }

            workspace={

                <SimulatorWorkspace

                    left={

                      <PassagePanel

                          group={currentGroup}

                      />

                  }

                    right={

                        <QuestionPanel>

                            <div className="mb-6">

                                <div className="text-sm uppercase tracking-wide text-gray-500">

                                    {

                                        currentGroup?.title ??

                                        "Question"

                                    }

                                </div>

                            </div>

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

                        </QuestionPanel>

                    }

                />

            }

            footer={

                <BottomToolbar

                    left={

                       <QuestionNavigation

                            onPrevious={previous}

                            onNext={next}

                            onMarkReview={toggleReview}

                            onReviewScreen={openReview}

                            reviewed={

                                marked.includes(

                                    question._id ??

                                    question.questionNumber

                                )

                            }

                            unansweredCount={

                                unansweredCount

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