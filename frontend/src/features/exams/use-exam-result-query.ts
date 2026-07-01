"use client";

import {
useQuery,
} from "@tanstack/react-query";

import {
getExamResult,
} from "./exam.service";

export const useExamResultQuery =
(
examId: string
) => {

return useQuery({

queryKey:[
"exam-result",
examId,
],

queryFn:
()=>getExamResult(
examId
),

enabled:
!!examId,

});

};