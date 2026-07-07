import api from "@/lib/api";

class SimulatorService {

    async getExamTypes() {

        const { data } =
            await api.get(
                "/simulator/types"
            );

        return data;

    }

    async getPublishedExams(
        examType?: string
    ) {

        const { data } =
            await api.get(
                "/simulator/exams",
                {
                    params: {
                        examType,
                    },
                }
            );

        return data;

    }

    async startSimulator(
        id: string
    ) {

        const { data } =
            await api.post(
                `/simulator/start/${id}`
            );

        return data;

    }

    async getAttempt(
        id: string
    ) {

        const { data } =
            await api.get(
                `/simulator/attempt/${id}`
            );

        return data;

    }

    async submitAttempt(
        id: string
    ) {

        const { data } =
            await api.post(
                `/simulator/attempt/${id}/submit`
            );

        return data;

    }

    async getResult(
        id: string
    ) {

        const { data } =
            await api.get(
                `/simulator/attempt/${id}/result`
            );

        return data;

    }

    async saveAnswer(

    attemptId: string,

    body: {

        questionId: string;

        selectedAnswer: string;

    }

) {

    const { data } =
        await api.patch(

            `/simulator/attempt/${attemptId}/answer`,

            body

        );

    return data;

}

}



export default new SimulatorService();