import api from "@/lib/api";

class ResultsService {

    async getAttempts() {

        const { data } =

            await api.get(

                "/exam-attempt"

            );

        return data.attempts;

    }

    async getSummary(

        id: string

    ) {

        const { data } =

            await api.get(

                `/evaluation/attempt/${id}`

            );

        return data;

    }

    async getSections(

        id: string

    ) {

        const { data } =

            await api.get(

                `/evaluation/attempt/${id}/sections`

            );

        return data;

    }

    async getReview(

        id: string

    ) {

        const { data } =

            await api.get(

                `/evaluation/attempt/${id}/review`

            );

        return data;

    }

}

export default new ResultsService();