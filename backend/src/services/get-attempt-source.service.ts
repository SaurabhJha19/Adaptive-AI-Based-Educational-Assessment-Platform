import {ExamModel} from "../models/exam.model";
import OfficialExam from "../modules/simulator/models/official-exam.model";

import { ExamSource } from "../constants/exam-source.enum";

class GetAttemptSourceService {
  async execute(attempt: any) {
    switch (attempt.sourceType) {
      case ExamSource.GENERATED:
        return ExamModel.findById(attempt.sourceId);

      case ExamSource.SIMULATOR:
        return OfficialExam.findById(attempt.sourceId);

      default:
        throw new Error("Unknown exam source.");
    }
  }
}

const getAttemptSourceService = new GetAttemptSourceService();

export default getAttemptSourceService;