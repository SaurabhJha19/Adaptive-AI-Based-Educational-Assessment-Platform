import OfficialExam from "../models/official-exam.model";
import { SimulatorStatus } from "../constants/simulator-status.enum";

class PublishService {
  async publish(examId: string) {
    const exam = await OfficialExam.findById(examId);

    if (!exam) {
      throw new Error("Official exam not found.");
    }

    exam.status = SimulatorStatus.PUBLISHED;

    await exam.save();

    return exam;
  }

  async archive(examId: string) {
    const exam = await OfficialExam.findById(examId);

    if (!exam) {
      throw new Error("Official exam not found.");
    }

    exam.status = SimulatorStatus.ARCHIVED;

    await exam.save();

    return exam;
  }
}

export default new PublishService();