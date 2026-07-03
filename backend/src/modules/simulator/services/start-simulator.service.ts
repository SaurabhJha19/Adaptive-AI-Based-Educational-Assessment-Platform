import OfficialExam from "../models/official-exam.model";
import {ExamAttemptModel} from "../../../models/exam-attempt.model";

class StartSimulatorService {
  async execute(userId: string, officialExamId: string) {
    const exam = await OfficialExam.findById(officialExamId);

    if (!exam) {
      throw new Error("Official exam not found.");
    }

    const attempt = await ExamAttemptModel.create({
      userId,

      sourceType: "simulator",

      sourceId: officialExamId,

      examId: undefined,

      answers: [],

      score: 0,

      status: "IN_PROGRESS",

      startedAt: new Date(),
    });

    return {
      attemptId: attempt._id,
      exam,
    };
  }
}

export default new StartSimulatorService();