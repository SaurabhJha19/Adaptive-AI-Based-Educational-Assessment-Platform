import { useMutation } from "@tanstack/react-query";

import simulatorService from "../simulator.service";

export function useSubmitAttempt() {

    return useMutation({

        mutationFn: (
            id: string
        ) =>
            simulatorService.submitAttempt(
                id
            ),

    });

}