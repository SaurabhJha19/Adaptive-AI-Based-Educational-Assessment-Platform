import OfficialExam from "../models/official-exam.model";
import {ExamAttemptModel} from "../../../models/exam-attempt.model";

class StartSimulatorService {
  async execute(userId: string, officialExamId: string) {
    const exam = await OfficialExam.findById(officialExamId);

    if (!exam) {
      throw new Error("Official exam not found.");
    }

const totalQuestions =
  exam.sections?.reduce(
    (sectionTotal: number, section: any) =>
      sectionTotal +
      (section.questionGroups?.reduce(
        (groupTotal: number, group: any) =>
          groupTotal + (group.questions?.length || 0),
        0
      ) || 0),
    0
  ) || 0;

const attempt = await ExamAttemptModel.create({
  userId,

  sourceType: "simulator",

  sourceId: officialExamId,

  examId: undefined,

  answers: [],

  score: 0,

  percentage: 0,

  totalQuestions,

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