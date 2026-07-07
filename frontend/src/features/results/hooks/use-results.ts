import { useQuery } from "@tanstack/react-query";

import resultsService
from "../services/results.service";

export function useResults() {

    return useQuery({

        queryKey: [

            "results",

        ],

        queryFn:

            () =>

                resultsService.getAttempts(),

    });

}

export function useResultSummary(

    id: string

) {

    return useQuery({

        queryKey: [

            "result",

            id,

        ],

        queryFn:

            () =>

                resultsService.getSummary(

                    id

                ),

        enabled:

            !!id,

    });

}

export function useSectionResults(

    id: string

) {

    return useQuery({

        queryKey: [

            "sections",

            id,

        ],

        queryFn:

            () =>

                resultsService.getSections(

                    id

                ),

        enabled:

            !!id,

    });

}

export function useQuestionReview(

    id: string

) {

    return useQuery({

        queryKey: [

            "review",

            id,

        ],

        queryFn:

            () =>

                resultsService.getReview(

                    id

                ),

        enabled:

            !!id,

    });

}