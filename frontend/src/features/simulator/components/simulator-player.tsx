"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useExamPlayer from "../hooks/use-exam-player";
import useExamTimer from "../hooks/use-exam-timer";
import { useSubmitAttempt } from "../hooks/use-submit-attempt";

import SimulatorLayout from "./layout/simulator-layout";
import SimulatorHeader from "./layout/simulator-header";
import SimulatorWorkspace from "./layout/simulator-workspace";

import SplitPane from "./layout/split-pane";

import PassagePanel from "./layout/passage-panel";
import QuestionPanel from "./layout/question-panel";

import QuestionView from "./exam-player/question-view";
import QuestionPalette from "./exam-player/question-palette";
import QuestionNavigation from "./exam-player/question-navigation";

import ReviewScreen from "./review/review-screen";
import SectionTransition from "./transition/section-transition";
import BreakScreen from "./break/break-screen";

interface Props {

    exam: any;

    attempt: any;

}

export default function SimulatorPlayer({

    exam,

    attempt,

}: Props) {

    const router =
        useRouter();

    const player =
        useExamPlayer(

            exam,

            attempt._id

        );

    const timer =
        useExamTimer({

            initialTime:

                exam.duration * 60,

            onExpire:

                submitExam,

        });

    const submitAttempt =
        useSubmitAttempt();

    useEffect(() => {

        if (

            player.transitionMode &&

            player.isLastSection

        ) {

            submitExam();

        }

    }, [

        player.transitionMode,

        player.isLastSection,

    ]);

    async function submitExam() {

        if (

            submitAttempt.isPending

        ) {

            return;

        }

        await submitAttempt.mutateAsync(

                attempt._id,

        );

        router.push(

            `/simulator/result/${attempt._id}`

        );

    }

    if (

        player.breakMode

    ) {

        return (

            <BreakScreen

                duration={600}

                onSkip={

                    player.closeBreak

                }

            />

        );

    }

    if (

        player.transitionMode

    ) {

        return (

            <SectionTransition

                sectionIndex={

                    player.sectionIndex

                }

                totalSections={

                    exam.sections.length

                }

                onContinue={

                    player.closeTransition

                }

            />

        );

    }

    if (

        player.reviewMode

    ) {

        return (

            <ReviewScreen

                exam={exam}

                section={

                    player.section

                }

                questions={

                    player.questions

                }

                currentQuestion={

                    player.question.questionNumber

                }

                answers={

                    player.answers

                }

                marked={

                    player.marked

                }

                visited={

                    player.visited

                }

                onJump={

                    player.jump

                }

                onBack={

                    player.closeReview

                }

                onContinue={

                    player.submitReview

                }

            />

        );

    }

    return (

        <SimulatorLayout

            header={

                <SimulatorHeader

                    exam={exam}

                    section={player.section}

                    question={player.question}

                    currentQuestion={

                        player.question.questionNumber

                    }

                    totalQuestions={

                        player.questions.length

                    }

                    remainingTime={

                        timer.remainingTime

                    }

                />

            }

            workspace={

                <SimulatorWorkspace

                    content={

                        <SplitPane

                            left={

                                <PassagePanel

                                    group={

                                        player.currentGroup

                                    }

                                />

                            }

                            right={

                                <QuestionPanel>

                                    <QuestionView

                                        question={

                                            player.question

                                        }

                                        answer={

                                            player.answers[

                                                player.question._id ??

                                                player.question.questionNumber

                                            ]

                                        }

                                        onAnswer={

                                            player.answer

                                        }

                                    />

                                </QuestionPanel>

                            }

                        />

                    }

                    sidebar={

                        <QuestionPalette

                            questions={

                                player.questions

                            }

                            currentQuestion={

                                player.question.questionNumber

                            }

                            answers={

                                player.answers

                            }

                            marked={

                                player.marked

                            }

                            visited={

                                player.visited

                            }

                            onSelectQuestion={

                                player.jump

                            }

                        />

                    }

                />

            }

            footer={

                <QuestionNavigation

                    onPrevious={

                        player.previous

                    }

                    onNext={

                        player.next

                    }

                    onMarkReview={

                        player.toggleReview

                    }

                    onReviewScreen={

                        player.openReview

                    }

                    onSubmit={

                        submitExam

                    }

                    reviewed={

                        player.marked.includes(

                            player.question._id ??

                            player.question.questionNumber

                        )

                    }

                    unansweredCount={

                        player.questions.length -

                        Object.keys(

                            player.answers

                        ).length

                    }

                    isSubmitting={

                        submitAttempt.isPending

                    }

                    isLastQuestion={

                        player.isLastQuestion

                    }

                />

            }

        />

    );

}