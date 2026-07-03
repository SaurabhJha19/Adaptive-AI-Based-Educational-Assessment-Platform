import OfficialExam from "../models/official-exam.model";
import { SimulatorStatus } from "../constants/simulator-status.enum";

class ParserService {
  async parse(examId: string) {
    const exam = await OfficialExam.findById(examId);

    if (!exam) {
      throw new Error("Official exam not found.");
    }

    exam.status = SimulatorStatus.REVIEW;

    await exam.save();

    return exam;
  }
}

export default new ParserService();