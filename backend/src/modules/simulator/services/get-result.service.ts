import { ExamAttemptModel } from "../../../models/exam-attempt.model";

class GetResultService {

    async execute(
        attemptId: string
    ) {

        return ExamAttemptModel
            .findById(attemptId)
            .populate("sourceId");

    }

}

export default new GetResultService();