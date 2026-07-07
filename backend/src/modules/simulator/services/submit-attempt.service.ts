import evaluateAttemptService
from "./evaluate-attempt.service";

class SubmitAttemptService {

    async execute(
        attemptId: string
    ) {

        return evaluateAttemptService.execute(
            attemptId
        );

    }

}

export default new SubmitAttemptService();