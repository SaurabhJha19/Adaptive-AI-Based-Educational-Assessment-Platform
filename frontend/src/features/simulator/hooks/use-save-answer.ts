import { useMutation } from "@tanstack/react-query";

import simulatorService from "../simulator.service";

export function useSaveAnswer() {

    return useMutation({

        mutationFn: (

            payload: {

                attemptId: string;

                questionId: string;

                selectedAnswer: string;

            }

        ) =>

            simulatorService.saveAnswer(

                payload.attemptId,

                {

                    questionId:
                        payload.questionId,

                    selectedAnswer:
                        payload.selectedAnswer,

                }

            ),

    });

}