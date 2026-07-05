import api from "@/lib/api";

export async function saveAnswer(
    attemptId: string,
    questionId: string,
    answer: string
) {
    return api.patch(
        `/simulator/attempt/${attemptId}/answer`,
        {
            questionId,
            answer,
        }
    );
}